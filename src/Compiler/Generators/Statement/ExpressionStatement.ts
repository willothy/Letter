import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function ExpressionStatement(this: Compiler, node, symbols, types: Object, fn, parent: ASTNode) {
    return this.codegen(node.expression, symbols, types, fn, node);
}