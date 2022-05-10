"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
function Program(node, symbols, fn, parent) {
    const entry = llvm_bindings_1.BasicBlock.Create(this.context, 'entry');
    this.builder.SetInsertPoint(entry);
    this.BlockStatement(node, symbols, fn, node);
}
exports.default = Program;
