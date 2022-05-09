import ASTNode from "../../../Parser/ASTNode";
import LetterTypes from "../../Types";

export default function CallExpression(this, node, symbols, fn, parent: ASTNode) {
    const callArgs = [];
    for (const arg of node.args) {
        callArgs.push(this.codegen(arg, symbols, fn, parent));
    }
    return this.builder.CreateCall(
        this.module.getFunction(node.callee.name), 
        callArgs
    );
}