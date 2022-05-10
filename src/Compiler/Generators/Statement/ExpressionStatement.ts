import { ASTNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function ExpressionStatement(this: Compiler, node, symbols, fn, parent: ASTNode) {
    return this.codegen(node.expression, symbols, fn, node);
}