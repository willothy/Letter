const { ConstantInt, PointerType, APInt, APFloat, LoadInst } = require('llvm-bindings');
const llvm = require('llvm-bindings');

class CompilerError extends Error {}
class TypeError extends CompilerError {}

// https://stackoverflow.com/a/28191966/6884167
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

class Compiler {

    context;
    module;
    builder;

    constructor(moduleName) {
        this.context = new llvm.LLVMContext();
        this.module = new llvm.Module(moduleName, this.context);
        this.builder = new llvm.IRBuilder(this.context);
    }

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
            default:
                return this.builder.getInt8Ty();                
        }
    }

    convertValue(type, value) {
        switch (type) {
            case 'int':
                return llvm.ConstantInt.get(this.builder.getInt64Ty(), parseInt(value), true);
            case 'bool':
                return new llvm.APInt(1, parseInt(`${value}`), false);
            case 'float':
                return new llvm.ConstantFP.get(this.builder.getFloatTy(), parseFloat(value), true);
            case 'double':
                return new llvm.APFloat(parseFloat(`${value}`));
            case 'char':
                return new llvm.APInt(8, value, true);             
        }
    }
    
    compile(ast) {
        /*this.module.getOrInsertFunction(
            'printf',
            llvm.FunctionType.get(this.builder.getInt32Ty(), [llvm.PointerType.get(this.builder.getInt8Ty(), 0)], true), //llvm.FunctionType.get(this.builder.getInt32Ty(), false),   
        );*/
        this.codegen(ast);
        return this.module.print();
    }

    checkType(value, expectedType) {
        if (!llvm.Type.isSameType(value.getType(), expectedType)) {
            let exp = getKeyByValue(llvm.Type.TypeID, expectedType.getTypeID());
            exp = exp.substring(0, exp.length-4);

            let got = getKeyByValue(llvm.Type.TypeID, value.getType().getTypeID());
            got = got.substring(0, got.length-4)

            let m = `Expected type ${
                exp
            }, got ${
                got
            }`;
            throw new TypeError(m);
        }
        return value;
    }

    isFloat(val) {
        try {
            const test = val.getType().isFloatingPointTy();
            return true;
        } catch (e) {
            return false;
        }
    }

    isInteger(val) {
        return val.getType().isIntegerTy(32);
    }

    resolveArrayParam(param) {
        let resolved = llvm.PointerType.get(this.convertType(param.type.type), 0);
        for (let i = 1; i < param.type.dimensions; i++) {
            resolved = llvm.PointerType.get(resolved, 0);
        }
        return resolved;
    }

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

    codegen(ast, symbols = {}) {
        let current = ast;

        if (current.type === 'Program') {
            /*const mainReturnType = llvm.FunctionType.get(this.builder.getInt32Ty(), [], false);
            const main = llvm.Function.Create(mainReturnType, llvm.Function.LinkageTypes.ExternalLinkage, 'test', this.module);
            */
            const mainEntry = llvm.BasicBlock.Create(this.context, 'entry');
            this.builder.SetInsertPoint(mainEntry);

            for (const statement of current.body) {
                this.codegen(statement, symbols);
            }
            
            //console.log(symbols)
            //const info = symbols.circumference; 

            //const load = this.builder.CreateLoad(info.type, info.alloc, 'tmp');
            //console.log(getKeyByValue(llvm.Type.TypeID, load.getType().getTypeID()));

            /*this.builder.CreateCall(
                this.module.getFunction('printf'), 
                [
                    this.builder.CreateGlobalStringPtr("%f\n"), 
                    this.builder.CreateFPExt(load, this.builder.getDoubleTy(), 'tmp')
                ], 
                'printCall'
            );*/
            //this.builder.CreateRet(ConstantInt.get(this.builder.getInt32Ty(), 0, false));
        }
        if (current.type === 'BlockStatement') {
            for (const statement of current.body) {
                this.codegen(statement, symbols);
            }
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
                    //console.log(r);
                    params.push(r);
                }
            }
            
            let returnType = this.resolveFuncType(current.returnType);
            
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
            });
            this.builder.CreateRet(this.builder.getInt32(0));
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
                callArgs, 
                current.callee.name + '_call'
            );
        }
        if (current.type === 'ExternDeclaration') {
            let params = [];
            for (const param of current.params) {
                if (param.type.arrayType === false) {
                    params.push(this.convertType(param.type.type));
                } else {
                    const r = this.resolveArrayParam(param);
                    //console.log(r);
                    params.push(r);
                }
            }
            //console.log(params);
            this.module.getOrInsertFunction(
                current.name.name,
                llvm.FunctionType.get(this.convertType(current.type.type), params, true) //llvm.FunctionType.get(this.builder.getInt32Ty(), false),   
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
        if (current.type === 'NumericLiteral') {
            //return llvm.ConstantFP.get(this.builder.getFloatTy(), current.value);
            
            if (current.valType === 'INTEGER')
                return llvm.ConstantInt.get(this.builder.getInt32Ty(), current.value, true);
            else
                return llvm.ConstantFP.get(this.builder.getFloatTy(), current.value, true);
        }
        if (current.type === 'StringLiteral') {
            
            //this.builder.CreateGlobalStringPtr(current.value, 'anon_str', 0, this.module);
            let literal = current.value;
            let chars = literal.split('');
            let init = llvm.ArrayType.get(this.builder.getInt8Ty(), literal.length).getPointerTo;
            let global = new llvm.GlobalVariable(
                this.builder.getInt8Ty(),
                false,
                llvm.Function.LinkageTypes.ExternalLinkage,
                init,
                literal 
            )
            
            for (let ch of chars) {
                ch = llvm.ConstantInt.get(this.context, new llvm.APInt(8, ch.charCodeAt(0), true));
            }
            
            console.log(chars);
            return llvm.ConstantExpr.getBitCast()
        }
        if (current.type === 'Identifier') {
            const info = symbols[current.name];
            if (info.isArg)
                return info.alloc;
            else
                return this.builder.CreateLoad(info.type, info.alloc, 'tmp');
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