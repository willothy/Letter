"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
const Types_1 = require("../../Types");
function FunctionDeclaration(node, symbols, types = Object.assign({}, Types_1.default)) {
    const params = [];
    const paramSymbols = [];
    for (const param of node.params) {
        paramSymbols.push(param.id.name);
        if (param.type.arrayType === false) {
            params.push(this.convertType(param.type.baseType));
        }
        else {
            const r = this.resolveArrayParam(param);
            params.push(r);
        }
    }
    const returnType = node.returnType.baseType === 'void' ? this.builder.getVoidTy() : this.resolveFuncType(node.returnType);
    const funcType = llvm_bindings_1.FunctionType.get(returnType, params, false);
    const func = llvm_bindings_1.Function.Create(funcType, llvm_bindings_1.Function.LinkageTypes.ExternalLinkage, node.name.name, this.module);
    const locals = {};
    for (const [index, symbol] of paramSymbols.entries()) {
        const arg = func.getArg(index);
        arg.setName(symbol);
        locals[symbol] = {
            type: arg.getType(),
            name: symbol,
            alloc: arg,
            isArg: true
        };
    }
    const entryBB = llvm_bindings_1.BasicBlock.Create(this.context, 'entry', func);
    this.builder.SetInsertPoint(entryBB);
    this.codegen(node.body, Object.assign(Object.assign({}, symbols), locals), func);
    if (node.returnType.baseType === 'void')
        this.builder.CreateRetVoid();
}
exports.default = FunctionDeclaration;
