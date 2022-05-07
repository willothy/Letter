import { ConstantInt } from "llvm-bindings";

export default function VariableStatement(this, node, symbols, fn) {
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