import { Type, Value } from "llvm-bindings";
import llvm = require("llvm-bindings");
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterFunction from "../../Function/Function";
import LetterTypes from "../../Types"; 

function hasSameCallArgs(letterFn: LetterFunction, calleeFn: {
    argTypes: Type[]
}) {
    /*if (letterFn.argTypes.length != calleeFn.argTypes.length) 
        return false;*/
    
    for (const [index, t] of Object.entries(letterFn.argTypes)) {
        if (!Type.isSameType(t, calleeFn.argTypes[index]))
            return false;
    }
    return true;
}

export default function CallExpression(this: Compiler, node: ASTNode, symbols, fn, parent: ASTNode) {
    const callArgs: Value[] = [];
    let varType;
    if (parent.extraContext && parent.extraContext['varType'])
        varType = parent.extraContext['varType'];

    for (let i = 0; i < node.args.length; i++) {
        callArgs.push(this.codegen(node.args[i], symbols, fn, node.withContext({ argPos: i, varType: varType ?? null })));
    }
    //console.log(node.callee.name)
    const fns: LetterFunction[] = this.functions[node.callee.name];
   // console.log(fns);
    const argTypes: Type[] = [];
    for (const arg of callArgs) argTypes.push(arg.getType());
    
    for (const fn of fns) {
        const sameRetType = 
            (parent.extraContext && parent.extraContext['varType']) 
            ? Type.isSameType(parent.extraContext['varType'], fn.returnType)
            : true; // Set to true to ignore if the varType context isn't present
        if (hasSameCallArgs(fn, { argTypes }) && sameRetType) {
            return this.builder.CreateCall(
                fn.llvm, 
                callArgs,
            );
        }
    }
    throw new Error(`No function ${node.callee.name} defined for the provided arg types`);
}