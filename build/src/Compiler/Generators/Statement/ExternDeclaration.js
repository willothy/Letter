"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
const Types_1 = require("../../Types");
function ExternDeclaration(node, types = Object.assign({}, Types_1.default)) {
    const params = [];
    for (const param of node.params) {
        if (param.type.arrayType === false) {
            params.push(this.convertType(param.type.type));
        }
        else {
            const r = this.resolveArrayParam(param);
            params.push(r);
        }
    }
    this.module.getOrInsertFunction(node.name.name, llvm_bindings_1.FunctionType.get(this.convertType(node.type.type), params, true));
}
exports.default = ExternDeclaration;
