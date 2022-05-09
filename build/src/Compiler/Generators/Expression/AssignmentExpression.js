"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
function AssignmentExpression(node, symbols, types = Object.assign({}, Types_1.default), fn) {
    const info = symbols[node.left.name];
    this.builder.CreateStore(this.checkType(this.codegen(node.right, symbols, fn), info.type), info.alloc);
    return this.builder.CreateLoad(info.type, info.alloc, node.left.name);
}
exports.default = AssignmentExpression;
