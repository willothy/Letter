"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
function ReturnStatement(node, symbols, types = Object.assign({}, Types_1.default), fn) {
    this.builder.CreateRet(this.codegen(node.argument, symbols, fn));
}
exports.default = ReturnStatement;
