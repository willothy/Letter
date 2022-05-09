"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
function CallExpression(node, symbols, types = Object.assign({}, Types_1.default), fn) {
    const callArgs = [];
    for (const arg of node.args) {
        callArgs.push(this.codegen(arg, symbols, fn));
    }
    return this.builder.CreateCall(this.module.getFunction(node.callee.name), callArgs);
}
exports.default = CallExpression;
