import { ConstantFP, ConstantInt } from "llvm-bindings";

export default function NumericLiteral(this, node) {
    return node.valType === 'INTEGER' ? 
        ConstantInt.get(this.builder.getInt32Ty(), node.value, true) 
        : ConstantFP.get(this.builder.getFloatTy(), node.value);
}