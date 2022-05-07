import { BasicBlock } from "llvm-bindings";

export default function Program (this, node, symbols, fn) {
    const entry = BasicBlock.Create(this.context, 'entry');
    this.builder.SetInsertPoint(entry);
    this.BlockStatement(node, symbols, fn);
}