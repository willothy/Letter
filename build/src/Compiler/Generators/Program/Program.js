"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
const Types_1 = require("../../Types");
function Program(node, symbols, types = Object.assign({}, Types_1.default), fn) {
    const entry = llvm_bindings_1.BasicBlock.Create(this.context, 'entry');
    this.builder.SetInsertPoint(entry);
    this.BlockStatement(node, symbols, fn);
}
exports.default = Program;
