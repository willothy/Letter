"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AssignmentExpression(node, symbols, fn, parent) {
    const info = symbols[node.left.name];
    this.builder.CreateStore(this.checkType(this.codegen(node.right, symbols, fn, parent), info.type), info.alloc);
    return this.builder.CreateLoad(info.type, info.alloc, node.left.name);
}
exports.default = AssignmentExpression;
