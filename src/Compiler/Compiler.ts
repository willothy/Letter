import { 
    ConstantInt,
    ConstantFP, 
    PointerType,
    ArrayType, 
    APInt,
    Function,
    Type,
    FunctionType,
    BasicBlock,
    LLVMContext, 
    Module, 
    IRBuilder 
} from "llvm-bindings"

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

export default class Compiler {

    context: LLVMContext;
    module: Module;
    builder: IRBuilder;

    constructor(moduleName) {
        this.context = new LLVMContext();
        this.module = new Module(moduleName, this.context);
        this.builder = new IRBuilder(this.context);
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

    codegen(node, symbols:{}={}, fn:Function=undefined) {
        switch (node.type) {
            case 'Program':
                this.Program(node, symbols, fn);
                return;
            case 'BlockStatement':
                this.BlockStatement(node, symbols, fn);
                return;
            case 'ReturnStatement':
                this.ReturnStatement(node, symbols, fn);
                return;
            case 'FunctionDeclaration':
                this.FunctionDeclaration(node, symbols, fn);
                return;
            case 'ExpressionStatement':
                this.ExpressionStatement(node, symbols, fn);
                return;
            case 'ExternDeclaration':
                this.ExternDeclaration(node);
                return;
            case 'VariableStatement':
                this.VariableStatement(node, symbols, fn);
                return;
            case 'CallExpression':
                return this.CallExpression(node, symbols, fn);
            case 'AssignmentExpression':
                return this.AssignmentExpression(node, symbols, fn);
            case 'NumericLiteral':
                return this.NumericLiteral(node);
            case 'CharLiteral':
                return this.CharLiteral(node);
            case 'StringLiteral':
                return this.StringLiteral(node);
            case 'Identifier':
                return this.Identifier(node, symbols);
            case 'BinaryExpression':
                return this.BinaryExpression(node, symbols, fn);                
            default:
                throw new Error("undefined instruction");
        }
    }

    Program(node, symbols, fn) {
        const entry = BasicBlock.Create(this.context, 'entry');
        this.builder.SetInsertPoint(entry);
        this.BlockStatement(node, symbols, fn);
    }

    BlockStatement(node, symbols, fn) {
        for (const statement of node.body) {
            this.codegen(statement, symbols, fn);
        }
    }

    ReturnStatement(node, symbols, fn) {
        this.builder.CreateRet(this.codegen(node.argument, symbols, fn));
    }

    FunctionDeclaration(node, symbols, fn) {
        const params = [];
        const paramSymbols = [];
        for (const param of node.params) {
            paramSymbols.push(param.id.name);
            if (param.type.arrayType === false) {
                params.push(this.convertType(param.type.type));
            } else {
                const r = this.resolveArrayParam(param);
                params.push(r);
            }
        }
        
        const returnType = node.returnType.type === 'void' ? this.builder.getVoidTy() : this.resolveFuncType(node.returnType);
        
        const funcType = FunctionType.get(returnType, params, false);
        const func = Function.Create(
            funcType,
            Function.LinkageTypes.ExternalLinkage,
            node.name.name,
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
        const entryBB = BasicBlock.Create(this.context, 'entry', func);
        this.builder.SetInsertPoint(entryBB);
        this.codegen(node.body, {
            ...symbols, 
            ...locals
        }, func);
        if (node.returnType.type === 'void')
            this.builder.CreateRetVoid();
    }

    ExpressionStatement(node, symbols, fn) {
        return this.codegen(node.expression, symbols, fn);
    }

    CallExpression(node, symbols, fn) {
        const callArgs = [];
        for (const arg of node.arguments) {
            callArgs.push(this.codegen(arg, symbols, fn));
        }
        return this.builder.CreateCall(
            this.module.getFunction(node.callee.name), 
            callArgs
        );
    }

    ExternDeclaration(node) {
        const params = [];
        for (const param of node.params) {
            if (param.type.arrayType === false) {
                params.push(this.convertType(param.type.type));
            } else {
                const r = this.resolveArrayParam(param);
                
                params.push(r);
            }
        }
        
        this.module.getOrInsertFunction(
            node.name.name,
            FunctionType.get(this.convertType(node.type.type), params, true) 
        );
    }

    VariableStatement(node, symbols, fn) {
        for (const declaration of node.declarations) {
            const type = this.convertType(declaration.valType.type)
            const alloc = this.builder.CreateAlloca(
                type, 
                ConstantInt.get(this.builder.getInt8Ty(), 0, false), 
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
                        this.codegen(declaration.init, symbols, fn),
                        type
                    ),
                    alloc
                );
            }
        }
    }

    AssignmentExpression(node, symbols, fn) {
        const info = symbols[node.left.name];
        this.builder.CreateStore(
            this.checkType(
                this.codegen(node.right, symbols, fn),
                info.type
            ),
            info.alloc
        );
        return this.builder.CreateLoad(info.type, info.alloc, node.left.name);
    }

    NumericLiteral(node) {
        return node.valType === 'INTEGER' ? 
            ConstantInt.get(this.builder.getInt32Ty(), node.value, true) 
            : ConstantFP.get(this.builder.getFloatTy(), node.value);
    }

    CharLiteral(node: any) {
        return ConstantInt.get(this.builder.getInt8Ty(), node.value, false);
    }

    StringLiteral(node: any) {
        const value = `${this.unbackslash(node.value)}\0`;
        const baseType = this.builder.getInt8Ty();
        const arrayType = ArrayType.get(baseType, value.length);
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
                ConstantInt.get(this.context, new APInt(8, char.charCodeAt(0), false)),
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

    Identifier(node: any, symbols: {}) {
        const info = symbols[node.name];
        return info.isArg ? info.alloc : this.builder.CreateLoad(info.type, info.alloc, 'tmp');
    }

    BinaryExpression(node: any, symbols: {}, fn: Function) {
        let left = this.codegen(node.left, symbols, fn);
        let right = this.codegen(node.right, symbols, fn);

        const leftType = left.getType();
        const rightType = right.getType();
        
        if (Type.isSameType(leftType, rightType)) {
            if (leftType.isIntegerTy(32)) {
                if (node.operator === '+') {
                    return this.builder.CreateAdd(left, right, 'addtmp');
                } else if (node.operator === '-') {
                    return this.builder.CreateSub(left, right, 'subtmp');
                } else if (node.operator === '*') {
                    return this.builder.CreateMul(left, right, 'multmp');
                } else if (node.operator === '/') {
                    return this.builder.CreateSDiv(left, right, 'divtmp');
                }
            } else {
                if (node.operator === '+') {
                    return this.builder.CreateFAdd(left, right, 'faddtmp');
                } else if (node.operator === '-') {
                    return this.builder.CreateFSub(left, right, 'fsubtmp');
                } else if (node.operator === '*') {
                    return this.builder.CreateFMul(left, right, 'fmultmp');
                } else if (node.operator === '/') {
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
                if (node.operator === '+') {
                    return this.builder.CreateFAdd(left, right, 'faddtmp');
                } else if (node.operator === '-') {
                    return this.builder.CreateFSub(left, right, 'fsubtmp');
                } else if (node.operator === '*') {
                    return this.builder.CreateFMul(left, right, 'fmultmp');
                } else if (node.operator === '/') {
                    return this.builder.CreateFDiv(left, right, 'fdivtmp');
                }
            } else {
                throw new Error("Cannot convert between types");
            }
        }
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
     * @param {Type} type 
     * @param {Value} value 
     * @returns llvm value from JS value (WIP)
     */
    convertValue(type, value) {
        switch (type) {
            case 'int':
                return ConstantInt.get(this.builder.getInt64Ty(), parseInt(value, 10), true);
            case 'bool':
                return ConstantInt.get(this.builder.getInt1Ty(), value, false);
            case 'float':
                return ConstantFP.get(this.builder.getFloatTy(), parseFloat(value));
            case 'double':
                return ConstantFP.get(this.builder.getDoubleTy(), parseFloat(value));
            case 'char':
                return ConstantInt.get(this.builder.getInt8Ty(), value, false);             
        }
    }

    /**
     * 
     * @param {Value} value 
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
     * @param {Value} value 
     * @param {String} expectedType 
     * @returns input value or post-typecast value
     * @throws TypeError if types are different and typecast fails.
     */
    checkType(value, expectedType) {
        if (!Type.isSameType(value.getType(), expectedType)) {
            let exp = getKeyByValue(Type.TypeID, expectedType.getTypeID());
            exp = exp.substring(0, exp.length-4);

            let got = getKeyByValue(Type.TypeID, value.getType().getTypeID());
            got = got.substring(0, got.length-4)

            const v = this.handleNumericTypecasts(value, exp, got);
            if (v) return v;
            
            const typeErrorMessage = `Expected type ${
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
     * @param {Value}} val 
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
     * @param {Value} val 
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
        let resolved = PointerType.get(this.convertType(param.type.type), 0);
        for (let i = 1; i < param.type.dimensions; i++) {
            resolved = PointerType.get(resolved, 0);
        }
        return resolved;
    }

    /**
     * 
     * @param {returnType} returnType 
     * @returns returnType as Type
     */
    resolveFuncType(returnType) {
        if (returnType.arrayType === false) {
            return this.convertType(returnType.type);
        } else {
            let resolved = PointerType.get(this.convertType(returnType.type), 0);
            for (let i = 1; i < returnType.dimensions; i++) {
                resolved = PointerType.get(resolved, 0);
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

    
}
