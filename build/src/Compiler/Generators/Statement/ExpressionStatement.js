"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
function ExpressionStatement(node, symbols, types = Object.assign({}, Types_1.default), fn) {
    return this.codegen(node.expression, symbols, fn);
}
exports.default = ExpressionStatement;
