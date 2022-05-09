"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
const Types_1 = require("../../Types");
function BinaryExpression(node, symbols, types = Object.assign({}, Types_1.default), fn) {
    let left = this.codegen(node.left, symbols, fn);
    let right = this.checkType(this.codegen(node.right, symbols, fn), left.getType());
    const typeId = this.getKeyByValue(llvm_bindings_1.Type.TypeID, left.getType().getTypeID()).toLowerCase();
    const typeName = typeId.slice(0, typeId.length - 4);
    const typeInterface = types[typeName];
    if (node.operator === '+') {
        return typeInterface.add(left, right, this.builder);
    }
    else if (node.operator === '-') {
        return typeInterface.sub(left, right, this.builder);
    }
    else if (node.operator === '*') {
        return typeInterface.mul(left, right, this.builder);
    }
    else if (node.operator === '/') {
        return typeInterface.div(left, right, this.builder);
    }
}
exports.default = BinaryExpression;
