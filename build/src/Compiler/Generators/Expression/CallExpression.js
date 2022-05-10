"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
function hasSameCallArgs(letterFn, calleeFn) {
    /*if (letterFn.argTypes.length != calleeFn.argTypes.length)
        return false;*/
    for (const [index, t] of Object.entries(letterFn.argTypes)) {
        if (!llvm_bindings_1.Type.isSameType(t, calleeFn.argTypes[index]))
            return false;
    }
    return true;
}
function CallExpression(node, symbols, fn, parent) {
    const callArgs = [];
    let varType;
    if (parent.extraContext && parent.extraContext['varType'])
        varType = parent.extraContext['varType'];
    for (let i = 0; i < node.args.length; i++) {
        callArgs.push(this.codegen(node.args[i], symbols, fn, node.withContext({ argPos: i, varType: varType !== null && varType !== void 0 ? varType : null })));
    }
    //console.log(node.callee.name)
    const fns = this.functions[node.callee.name];
    // console.log(fns);
    const argTypes = [];
    for (const arg of callArgs)
        argTypes.push(arg.getType());
    const possibles = [];
    for (const fn of fns) {
        let sameRetType = (parent.extraContext && parent.extraContext['varType'])
            ? llvm_bindings_1.Type.isSameType(parent.extraContext['varType'], fn.returnType)
            : true; // Set to true to ignore if the varType context isn't present
        if (hasSameCallArgs(fn, { argTypes }) && sameRetType) {
            return this.builder.CreateCall(fn.llvm, callArgs);
        }
        else if (hasSameCallArgs(fn, { argTypes }) && !sameRetType)
            possibles.push(fn);
    }
    // Second pass if no functions match, check if typecasting is possible.
    // Only loop through functions identified as having same call args in previous pass
    for (const fn of possibles) {
        let sameRetType = (parent.extraContext && parent.extraContext['varType'])
            ? llvm_bindings_1.Type.isSameType(parent.extraContext['varType'], fn.returnType)
            : true; // Set to true to ignore if the varType context isn't present
        if (sameRetType === false)
            sameRetType = this.canTypeCast(fn.returnType, parent.extraContext['varType']);
        if (hasSameCallArgs(fn, { argTypes }) && sameRetType) {
            return this.builder.CreateCall(fn.llvm, callArgs);
        }
    }
    throw new Error(`No function ${node.callee.name} defined for the provided arg types`);
}
exports.default = CallExpression;
