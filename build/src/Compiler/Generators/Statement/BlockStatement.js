"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BlockStatement(node, symbols, fn, parent) {
    for (const statement of node.body) {
        this.codegen(statement, symbols, fn, node);
    }
}
exports.default = BlockStatement;
