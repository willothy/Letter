"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
function CharLiteral(node) {
    return llvm_bindings_1.ConstantInt.get(this.builder.getInt8Ty(), node.value, false);
}
exports.default = CharLiteral;
