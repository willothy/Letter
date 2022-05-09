import ASTNode from "../../../Parser/ASTNode";
import LetterTypes from "../../Types";

export default function CallExpression(this, node, symbols, types: Object, fn, parent: ASTNode) {
    const callArgs = [];
    for (const arg of node.args) {
        callArgs.push(this.codegen(arg, symbols, types, fn, parent));
    }
    return this.builder.CreateCall(
        this.module.getFunction(node.callee.name), 
        callArgs
    );
}