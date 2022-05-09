"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
function NumericLiteral(node) {
    return node.valType === 'INTEGER' ?
        llvm_bindings_1.ConstantInt.get(this.builder.getInt32Ty(), node.value, true)
        : llvm_bindings_1.ConstantFP.get(this.builder.getDoubleTy(), node.value);
}
exports.default = NumericLiteral;
