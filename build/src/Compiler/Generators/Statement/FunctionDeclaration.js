"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
const Function_1 = require("../../Function/Function");
function FunctionDeclaration(node, symbols, parent) {
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
    if (!this.functions[node.name.name])
        this.functions[node.name.name] = [];
    const returnType = node.returnType.baseType === 'void' ? this.builder.getVoidTy() : this.resolveFuncType(node.returnType);
    const funcType = llvm_bindings_1.FunctionType.get(returnType, params, false);
    const numDefs = this.functions[node.name.name].length;
    const fnName = node.name.name !== 'main'
        ? numDefs > 0 ? `${node.name.name}.${numDefs}` : `${node.name.name}`
        : 'main';
    const func = llvm_bindings_1.Function.Create(funcType, llvm_bindings_1.Function.LinkageTypes.ExternalLinkage, fnName, this.module);
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
    this.codegen(node.body, Object.assign(Object.assign({}, symbols), locals), func, parent);
    if (node.returnType.baseType === 'void')
        this.builder.CreateRetVoid();
    if (this.functions[node.name.name].length > 0)
        this.functions[node.name.name].push(new Function_1.default(node.name.name, fnName, returnType, params, func, funcType));
    else
        this.functions[node.name.name] = [new Function_1.default(node.name.name, fnName, returnType, params, func, funcType)];
}
exports.default = FunctionDeclaration;
