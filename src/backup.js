const { ConstantInt, PointerType, APInt, APFloat } = require('llvm-bindings');
const llvm = require('llvm-bindings');

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
        }
    }

    convertValue(type, value) {
        switch (type) {
            case 'int':
                return llvm.ConstantInt.get(this.builder.getInt64Ty(), parseInt(value), true);
            case 'bool':
                return new llvm.APInt(1, parseInt(`${value}`), false);
            case 'float':
                return new llvm.ConstantFP.get(this.builder.getFloatTy(), parseFloat(value));
            case 'double':
                return new llvm.APFloat(parseFloat(`${value}`));
            case 'char':
                return new llvm.APInt(8, value, true);             
        }
    }
    
    compile(ast) {
        this.module.getOrInsertFunction(
            'printf',
            llvm.FunctionType.get(this.builder.getInt32Ty(), [llvm.PointerType.get(this.builder.getInt8Ty(), 0)], true), //llvm.FunctionType.get(this.builder.getInt32Ty(), false),   
        );
        this.codegen(ast);
        return this.module.print();
    }

    codegen(ast, symbols = {}) {
        let current = ast;
        
        if (current.type === 'Program') {
            const mainReturnType = llvm.FunctionType.get(this.builder.getInt32Ty(), [], false);
            const main = llvm.Function.Create(mainReturnType, llvm.Function.LinkageTypes.ExternalLinkage, 'main', this.module);
            const mainEntry = llvm.BasicBlock.Create(this.context, 'entry', main);
            this.builder.SetInsertPoint(mainEntry);

            for (const statement of current.body) {
                this.codegen(statement, symbols);
            }

            const info = symbols.circumference; 

            this.builder.CreateCall(this.module.getFunction('printf'), [this.builder.CreateGlobalStringPtr("%d\n"), this.builder.CreateLoad(info.type, info.alloc, 'tmp')], 'printCall')
            this.builder.CreateRet(ConstantInt.get(this.builder.getInt32Ty(), 0, false));
        }
        if (current.type === 'VariableStatement') {
            for (const declaration of current.declarations) {
                const type = this.convertType(declaration.valType)
                const alloc = this.builder.CreateAlloca(
                    type, 
                    llvm.ConstantInt.get(this.builder.getInt8Ty(), 0, false), 
                    declaration.id.name
                ); //, 0, declaration.id.name
                if (declaration.init) {
                    symbols[declaration.id.name] = {
                        name: declaration.id.name,
                        type: type,
                        alloc: alloc
                    }
                    this.builder.CreateStore(this.codegen(declaration.init, symbols), alloc);
                }
            }
        }
        if (current.type === 'NumericLiteral') {
            //return llvm.ConstantFP.get(this.builder.getFloatTy(), current.value);
            if (current.value % 1 === 0)
                return llvm.ConstantInt.get(this.builder.getInt32Ty(), current.value);
            else
                return llvm.ConstantFP.get(this.builder.getFloatTy(), current.value);
        }
        if (current.type === 'Identifier') {
            const info = symbols[current.name];
            return this.builder.CreateLoad(info.type, info.alloc, 'tmp');
        }
        if (current.type === 'BinaryExpression') {
            let left = this.codegen(current.left, symbols);
            let right = this.codegen(current.right, symbols);

            console.log(current.left, left);
            console.log(current.right, right);

            const float = this.builder.getFloatTy();
            const int = this.builder.getInt32Ty();

            const leftType = left.getType();
            const rightType = right.getType();
            
            if (llvm.Type.isSameType(left.getType(), right.getType())) {
                if (leftType === int) {
                    if (current.operator === '+') {
                        return this.builder.CreateAdd(left, right, 'addtmp');
                    } else if (current.operator === '-') {
                        return this.builder.CreateSub(left, right, 'subtmp');
                    } else if (current.operator === '*') {
                        return this.builder.CreateMul(left, right, 'multmp');
                    } else if (current.operator === '/') {
                        return this.builder.CreateSDiv(left, right, 'divtmp');
                    }
                } else if (leftType === float) {
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
                if (leftType === float || rightType === float && leftType === int || rightType === int) {
                    left = leftType === int ? left : this.builder.CreateSIToFP(
                        left, 
                        this.builder.getFloatTy(), 
                        'convleft'
                    );
                    right = rightType === int ? right : this.builder.CreateSIToFP(
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
                }
            }
        }
    }

    functionDefCodegen(functionName, returnType, paramTypes=[]) {
        const functionType = llvm.FunctionType.get(returnType, paramTypes, false);
        const func = llvm.Function.Create(functionType, llvm.Function.LinkageTypes.ExternalLinkage, functionName, this.module);

        const entry = llvm.BasicBlock.Create(this.context, 'entry', func);
        this.builder.SetInsertPoint(entry);
        const args = [];
        for (let i = 0; i < paramTypes.length; i++) {
            args.push(func.getArg(i));
        }
    }

}

module.exports = {
    Compiler
};