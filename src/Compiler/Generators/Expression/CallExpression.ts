import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function CallExpression(this: Compiler, node: ASTNode, symbols, fn, parent: ASTNode) {
    const callArgs = [];
    let varType;
    if (parent.extraContext && parent.extraContext['varType'])
        varType = parent.extraContext['varType'];

    for (let i = 0; i < node.args.length; i++) {
        callArgs.push(this.codegen(node.args[i], symbols, fn, node.withContext({ argPos: i, varType: varType ?? null })));
    }
    return this.builder.CreateCall(
        this.module.getFunction(node.callee.name), 
        callArgs
    );
}