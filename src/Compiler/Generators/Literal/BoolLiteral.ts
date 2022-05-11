import { ConstantInt } from "llvm-bindings";
import { ASTNode } from "../../../Parser/ASTNodes/ASTNode";

export default function BoolLiteral(this, node: ASTNode, fn: llvm.Function, parent: ASTNode) {
    return ConstantInt.get(this.builder.getInt1Ty(), node.value ? 1 : 0, false);
}