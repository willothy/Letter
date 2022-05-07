import { ConstantInt } from "llvm-bindings";

export default function CharLiteral(node: any) {
    return ConstantInt.get(this.builder.getInt8Ty(), node.value, false);
}