"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ExpressionStatement(node, symbols, fn, parent) {
    return this.codegen(node.expression, symbols, fn, node);
}
exports.default = ExpressionStatement;
