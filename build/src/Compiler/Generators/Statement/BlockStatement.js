"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
function BlockStatement(node, symbols, types = Object.assign({}, Types_1.default), fn) {
    for (const statement of node.body) {
        this.codegen(statement, symbols, fn);
    }
}
exports.default = BlockStatement;
