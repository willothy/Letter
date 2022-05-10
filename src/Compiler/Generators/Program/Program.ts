import { BasicBlock } from "llvm-bindings";
import { ASTNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function Program (this: Compiler, node, symbols, fn, parent: ASTNode): void  {
    const entry = BasicBlock.Create(this.context, 'entry');
    this.builder.SetInsertPoint(entry);
    this.BlockStatement(node, symbols, fn, node);
}