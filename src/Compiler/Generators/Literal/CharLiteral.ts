import { ConstantInt } from "llvm-bindings";
import { ASTNode } from "../../../Parser/ASTNodes/ASTNode";

export default function CharLiteral(this, node: ASTNode, fn: llvm.Function, parent: ASTNode) {
    return ConstantInt.get(this.builder.getInt8Ty(), node.value, false);
}