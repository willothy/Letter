import { BasicBlock } from "llvm-bindings";
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function Program (this: Compiler, node, symbols, types: Object, fn, parent: ASTNode): void  {
    const entry = BasicBlock.Create(this.context, 'entry');
    this.builder.SetInsertPoint(entry);
    this.BlockStatement(node, symbols, types, fn, node);
}