import { Type } from "llvm-bindings";
import { ASTNode, LogicalExpressionNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";
import LetterType from "../../Types/Type";

export default function LogicalExpression(this: Compiler, node: ASTNode, symbols: Object, fn: llvm.Function, parent: ASTNode) {
    
}