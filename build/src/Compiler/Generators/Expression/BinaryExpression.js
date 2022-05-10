"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
function BinaryExpression(node, symbols, fn, parent) {
    let left = this.codegen(node.left, symbols, fn, parent);
    let right = this.checkType(this.codegen(node.right, symbols, fn, node), left.getType());
    const typeId = this.getKeyByValue(llvm_bindings_1.Type.TypeID, left.getType().getTypeID()).toLowerCase();
    const typeName = typeId.slice(0, typeId.length - 4);
    const typeInterface = this.types[typeName];
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
