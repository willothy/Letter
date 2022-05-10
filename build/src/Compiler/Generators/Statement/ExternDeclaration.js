"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
const Function_1 = require("../../Function/Function");
function ExternDeclaration(node, parent) {
    const params = [];
    for (const param of node.params) {
        if (param.type.arrayType === false) {
            params.push(this.convertType(param.type.baseType));
        }
        else {
            const r = this.resolveArrayParam(param);
            params.push(r);
        }
    }
    //const fnName = node.name.name + hash(String(Math.random() * 12345));
    const callee = this.module.getOrInsertFunction(node.name.name, llvm_bindings_1.FunctionType.get(this.convertType(node.valType.baseType), params, true));
    const fn = this.module.getFunction(node.name.name);
    //const fn = this.module.getFunction();
    if (this.functions[node.name.name])
        this.functions[node.name.name].push(new Function_1.default(node.name.name, node.name.name, fn.getReturnType(), params, fn, callee.getFunctionType()));
    else
        this.functions[node.name.name] = [new Function_1.default(node.name.name, node.name.name, fn.getReturnType(), params, fn, callee.getFunctionType())];
}
exports.default = ExternDeclaration;
