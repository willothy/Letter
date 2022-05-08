import { BasicBlock } from "llvm-bindings";
import LetterTypes from "../../Types";

export default function Program (this, node, symbols, types: Object = { ...LetterTypes }, fn): void  {
    const entry = BasicBlock.Create(this.context, 'entry');
    this.builder.SetInsertPoint(entry);
    this.BlockStatement(node, symbols, fn);
}