const { ConstantInt, PointerType, APInt, APFloat, LoadInst, LLVMConstants, AllocaInst } = require('llvm-bindings');
const llvm = require('llvm-bindings');

const { TypeError } = require('./Error/TypeError');

// https://stackoverflow.com/a/28191966/6884167
/**
 * 
 * @param {Object} object 
 * @param {Value} value 
 * @returns First key whose value is equal to value.
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

class Compiler {

    constructor(moduleName) {
        this.context = new llvm.LLVMContext();
        this.module = new llvm.Module(moduleName, this.context);
        this.builder = new llvm.IRBuilder(this.context);
    }

    /**
     * Returns an LLVM primitive type from a type label string
     * @param {String} typeStr 
     * @returns LLVM type
     */
    convertType(typeStr) {
        switch (typeStr) {
            case 'int':
                return this.builder.getInt32Ty();
            case 'bool':
                return this.builder.getInt1Ty();
            case 'float':
                return this.builder.getFloatTy();
            case 'double':
                return this.builder.getDoubleTy();
            case 'char':
                return this.builder.getInt8Ty();
            case 'string':
                return this.builder.getInt8PtrTy();
            default:
                return this.builder.getInt8Ty();                
        }
    }

    /**
     * 
     * @param {llvm.Type} type 
     * @param {Value} value 
     * @returns llvm value from JS value (WIP)
     */
    convertValue(type, value) {
        switch (type) {
            case 'int':
                return llvm.ConstantInt.get(this.builder.getInt64Ty(), parseInt(value), true);
            case 'bool':
                return new llvm.APInt(1, parseInt(`${value}`), false);
            case 'float':
                return new llvm.ConstantFP.get(this.builder.getFloatTy(), parseFloat(value), true);
            case 'double':
                return new llvm.ConstantFP.get(this.builder.getDoubleTy(), parseFloat(value), true);
            case 'char':
                return new llvm.ConstantInt.get(this.builder.getInt8Ty(), value, false);             
        }
    }
    
    /**
     * External interface for driver
     * @param {AST} ast 
     * @returns LLVM IR as text
     */
    compile(ast) {
        this.codegen(ast);
        return this.module.print();
    }

    /**
     * 
     * @param {llvm.Value} value 
     * @param {String} expectedType 
     * @param {String} gotType 
     * @returns new value of expected type if possible, else null
     */
    handleNumericTypecasts(value, expectedType, gotType) {
        if (expectedType === 'Double' && gotType === 'Float') {
            return this.builder.CreateFPExt(value, this.builder.getDoubleTy(), 'flt_upcast');
        } else if (expectedType === 'Float' && gotType === 'Double') {
            return this.builder.CreateFPTrunc(value, this.builder.getDoubleTy(), 'dbl_downcast');
        } else if (expectedType === 'Double' && gotType === 'Integer') {
            return this.builder.CreateSIToFP(value, this.builder.getDoubleTy(), 'si_to_dbl');
        } else if (expectedType === 'Float' && gotType === 'Integer') {
            return this.builder.CreateSIToFP(value, this.builder.getFloatTy(), 'si_to_flt');
        } else if (expectedType === 'Integer' && (gotType === 'Float' || gotType === 'Double')) {
            return this.builder.CreateFPToSI(value, this.builder.getInt64Ty(), 'flt_to_si');
        }
        return null;
    }

    /**
     * Checks if value is of type expectedType, attempts typecasts if not
     * @param {llvm.Value} value 
     * @param {String} expectedType 
     * @returns input value or post-typecast value
     * @throws TypeError if types are different and typecast fails.
     */
    checkType(value, expectedType) {
        if (!llvm.Type.isSameType(value.getType(), expectedType)) {
            let exp = getKeyByValue(llvm.Type.TypeID, expectedType.getTypeID());
            exp = exp.substring(0, exp.length-4);

            let got = getKeyByValue(llvm.Type.TypeID, value.getType().getTypeID());
            got = got.substring(0, got.length-4)

            const v = this.handleNumericTypecasts(value, exp, got);
            if (v) return v;
            
            let typeErrorMessage = `Expected type ${
                exp
            }, got ${
                got
            }`;
            throw new TypeError(typeErrorMessage);
        }
        return value;
    }

    /**
     * Check if value is float
     * @param {llvm.Value}} val 
     * @returns boolean
     */
    isFloat(val) {
        try {
            const test = val.getType().isFloatingPointTy();
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Check if value is integer
     * @param {llvm.Value} val 
     * @returns 
     */
    isInteger(val) {
        return val.getType().isIntegerTy(32);
    }

    /**
     * 
     * @param {} param 
     * @returns param tyupe as LLVM.Type 
     */
    resolveArrayParam(param) {
        let resolved = llvm.PointerType.get(this.convertType(param.type.type), 0);
        for (let i = 1; i < param.type.dimensions; i++) {
            resolved = llvm.PointerType.get(resolved, 0);
        }
        return resolved;
    }

    /**
     * 
     * @param {returnType} returnType 
     * @returns returnType as llvm.Type
     */
    resolveFuncType(returnType) {
        if (returnType.arrayType === false) {
            return this.convertType(returnType.type);
        } else {
            let resolved = llvm.PointerType.get(this.convertType(returnType.type), 0);
            for (let i = 1; i < returnType.dimensions; i++) {
                resolved = llvm.PointerType.get(resolved, 0);
            }
            return resolved;
        }
    }

    // https://stackoverflow.com/a/48682135/6884167
    /**
     * Fix escape characters
     * @param {String} s 
     * @returns unescaped string
     */
    unbackslash(s) {
        return s.replace(/\\([\\rnt'"])/g, function(match, p1) {
            const codes = []
            for (const letter of p1) 
                codes.push(letter.charCodeAt(0));
            
            if (p1 === 'n') return '\n';
            if (p1 === 'r') return '\r';
            if (p1 === 't') return '\t';
            if (p1 === '\\') return '\\';
            
            return p1;       // unrecognised escape
        });
    }

    /**
     * Main codegen function
     * @param {AST} ast 
     * @param {Object} symbols 
     * @param {llvm.Function} fn 
     * @returns {llvm.Value} or null
     */
    codegen(ast, symbols = {}, fn=null) {
        let current = ast;

        if (current.type === 'Program') {
            const mainEntry = llvm.BasicBlock.Create(this.context, 'entry');
            this.builder.SetInsertPoint(mainEntry);

            for (const statement of current.body) {
                this.codegen(statement, symbols);
            }
        }
        if (current.type === 'BlockStatement') {
            for (const statement of current.body) {
                this.codegen(statement, symbols);
            }
        }
        if (current.type === 'ReturnStatement') {
            this.builder.CreateRet(this.codegen(current.argument));
        }
        if (current.type === 'FunctionDeclaration') {
            const params = [];
            const paramSymbols = [];
            for (const param of current.params) {
                paramSymbols.push(param.id.name);
                if (param.type.arrayType === false) {
                    params.push(this.convertType(param.type.type));
                } else {
                    const r = this.resolveArrayParam(param);
                    params.push(r);
                }
            }
            
            let returnType;
            returnType = current.returnType.type === 'void' ? this.builder.getVoidTy() : this.resolveFuncType(current.returnType);
            
            const funcType = llvm.FunctionType.get(returnType, params, false);
            const func = llvm.Function.Create(
                funcType,
                llvm.Function.LinkageTypes.ExternalLinkage,
                current.name.name,
                this.module
            );
            const locals = {};
            for (const [index, symbol] of paramSymbols.entries()) {
                const arg = func.getArg(index);
                arg.setName(symbol);
                locals[symbol] = {
                    type: arg.getType(),
                    name: symbol,
                    alloc: arg,
                    isArg: true
                };
            }
            const entryBB = llvm.BasicBlock.Create(this.context, 'entry', func);
            this.builder.SetInsertPoint(entryBB);
            this.codegen(current.body, {
                ...symbols, 
                ...locals
            }, func);
            if (current.returnType.type === 'void')
                this.builder.CreateRetVoid();
        }
        if (current.type === 'ExpressionStatement') {
            return this.codegen(current.expression, symbols);
        }
        if (current.type === 'CallExpression') {
            const callArgs = [];
            for (const arg of current.arguments) {
                callArgs.push(this.codegen(arg, symbols));
            }
            return this.builder.CreateCall(
                this.module.getFunction(current.callee.name), 
                callArgs
            );
        }
        if (current.type === 'ExternDeclaration') {
            let params = [];
            for (const param of current.params) {
                if (param.type.arrayType === false) {
                    params.push(this.convertType(param.type.type));
                } else {
                    const r = this.resolveArrayParam(param);
                    
                    params.push(r);
                }
            }
            
            this.module.getOrInsertFunction(
                current.name.name,
                llvm.FunctionType.get(this.convertType(current.type.type), params, true) 
            );
        }
        if (current.type === 'VariableStatement') {
            for (const declaration of current.declarations) {
                const type = this.convertType(declaration.valType.type)
                const alloc = this.builder.CreateAlloca(
                    type, 
                    llvm.ConstantInt.get(this.builder.getInt8Ty(), 0, false), 
                    declaration.id.name
                ); 
                
                if (declaration.init) {
                    symbols[declaration.id.name] = {
                        name: declaration.id.name,
                        type: type,
                        alloc: alloc
                    }
                    this.builder.CreateStore(
                        this.checkType(
                            this.codegen(declaration.init, symbols),
                            type
                        ),
                        alloc
                    );
                }
            }
        }
        if (current.type === 'AssignmentExpression') {
            const info = symbols[current.left.name];
            this.builder.CreateStore(
                this.checkType(
                    this.codegen(current.right, symbols, fn),
                    info.type
                ),
                info.alloc
            );
            return this.builder.CreateLoad(info.type, info.alloc, current.left.name);
        }
        if (current.type === 'NumericLiteral') {
            return current.valType === 'INTEGER' ? llvm.ConstantInt.get(this.builder.getInt32Ty(), current.value, true) : llvm.ConstantFP.get(this.builder.getFloatTy(), current.value, true);
        }
        if (current.type === 'CharLiteral') {
            return llvm.ConstantInt.get(this.builder.getInt8Ty(), current.value, false);
        }
        if (current.type === 'StringLiteral') {
            const value = this.unbackslash(current.value) + '\0';
            const baseType = this.builder.getInt8Ty();
            const arrayType = llvm.ArrayType.get(baseType, value.length);
            const alloc = this.builder.CreateAlloca(arrayType);
            
            for (let i = 0; i < value.length; i++) {
                const char = value.charAt(i);
                const insideElementPtr = this.builder.CreateGEP(
                    arrayType, 
                    alloc, 
                    [
                        this.builder.getInt32(0), 
                        this.builder.getInt32(i)
                    ]
                );
                
                this.builder.CreateStore(
                    llvm.ConstantInt.get(this.context, new APInt(8, char.charCodeAt(0), false)),
                    insideElementPtr
                );
            }
            return this.builder.CreateGEP(
                arrayType, 
                alloc, 
                [
                    this.builder.getInt32(0), 
                    this.builder.getInt32(0)
                ]
            );;
        }
        if (current.type === 'Identifier') {
            const info = symbols[current.name];
            return info.isArg ? info.alloc : this.builder.CreateLoad(info.type, info.alloc, 'tmp');
        }
        if (current.type === 'BinaryExpression') {
            let left = this.codegen(current.left, symbols);
            let right = this.codegen(current.right, symbols);

            const leftType = left.getType();
            const rightType = right.getType();
            
            if (llvm.Type.isSameType(leftType, rightType)) {
                if (leftType.isIntegerTy(32)) {
                    if (current.operator === '+') {
                        return this.builder.CreateAdd(left, right, 'addtmp');
                    } else if (current.operator === '-') {
                        return this.builder.CreateSub(left, right, 'subtmp');
                    } else if (current.operator === '*') {
                        return this.builder.CreateMul(left, right, 'multmp');
                    } else if (current.operator === '/') {
                        return this.builder.CreateSDiv(left, right, 'divtmp');
                    }
                } else {
                    if (current.operator === '+') {
                        return this.builder.CreateFAdd(left, right, 'faddtmp');
                    } else if (current.operator === '-') {
                        return this.builder.CreateFSub(left, right, 'fsubtmp');
                    } else if (current.operator === '*') {
                        return this.builder.CreateFMul(left, right, 'fmultmp');
                    } else if (current.operator === '/') {
                        return this.builder.CreateFDiv(left, right, 'fdivtmp');
                    }
                }
            } else {
                if (this.isFloat(left) || this.isFloat(right)) {
                    left = this.isFloat(left) ? left : this.builder.CreateSIToFP(
                        left, 
                        this.builder.getFloatTy(), 
                        'convleft'
                    );
                    right = this.isFloat(right) ? right : this.builder.CreateSIToFP(
                        right, 
                        this.builder.getFloatTy(), 
                        'convright'
                    );
                    if (current.operator === '+') {
                        return this.builder.CreateFAdd(left, right, 'faddtmp');
                    } else if (current.operator === '-') {
                        return this.builder.CreateFSub(left, right, 'fsubtmp');
                    } else if (current.operator === '*') {
                        return this.builder.CreateFMul(left, right, 'fmultmp');
                    } else if (current.operator === '/') {
                        return this.builder.CreateFDiv(left, right, 'fdivtmp');
                    }
                } else {
                    throw new Error("Cannot convert between types");
                }
            }
        }
    }

}

module.exports = {
    Compiler
};