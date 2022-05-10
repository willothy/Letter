"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
function NumericLiteral(node, fn, parent) {
    if (parent.type === 'ReturnStatement') {
        return node.valType === 'INTEGER' ?
            this.checkType(llvm_bindings_1.ConstantInt.get(this.builder.getInt32Ty(), node.value, true), fn.getReturnType())
            : this.checkType(llvm_bindings_1.ConstantFP.get(this.builder.getDoubleTy(), node.value), fn.getReturnType());
    } /*else if (parent.type === 'CallExpression') {
        const parentFunction = this.module.getFunction(parent.callee.name);
        return node.valType === 'INTEGER' ?
            this.checkType(ConstantInt.get(this.builder.getInt32Ty(), node.value, true), parentFunction.getArg(parent.extraContext['argPos']).getType())
            : this.checkType(ConstantFP.get(this.builder.getDoubleTy(), node.value), parentFunction.getArg(parent.extraContext['argPos']).getType());
    }*/
    else if (parent.extraContext && parent.extraContext['varType']) {
        return node.valType === 'INTEGER' ?
            this.checkType(llvm_bindings_1.ConstantInt.get(this.builder.getInt32Ty(), node.value, true), parent.extraContext['varType'])
            : this.checkType(llvm_bindings_1.ConstantFP.get(this.builder.getDoubleTy(), node.value), parent.extraContext['varType']);
    }
    else {
        return node.valType === 'INTEGER' ?
            llvm_bindings_1.ConstantInt.get(this.builder.getInt32Ty(), node.value, true)
            : llvm_bindings_1.ConstantFP.get(this.builder.getDoubleTy(), node.value);
    }
}
exports.default = NumericLiteral;
