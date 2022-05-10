"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ReturnStatement(node, symbols, fn, parent) {
    const gen = this.codegen(node.argument, symbols, fn, node);
    //console.log(fn.getReturnType().getTypeID(), gen);
    this.builder.CreateRet(this.checkType(gen, fn.getReturnType()));
}
exports.default = ReturnStatement;
