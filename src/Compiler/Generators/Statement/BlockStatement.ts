import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function BlockStatement(this: Compiler, node: ASTNode, symbols, fn, parent: ASTNode): void  {
    for (const statement of node.body) {
        this.codegen(statement, symbols, fn, node);
    }
}