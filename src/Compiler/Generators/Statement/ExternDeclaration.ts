import { FunctionType, Function, ConstantExpr, ConstantPointerNull, Constant } from "llvm-bindings";
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterFunction from "../../Function/Function";
import LetterTypes from "../../Types";

//https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript/
function hash(string) {            
    let hash = 0;
      
    if (string.length == 0) return hash;
      
    for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    const hashCodeChars = String(hash).split('');
    const hashCodeInts: number[] = [];
    hashCodeChars.forEach((value) => hashCodeInts.push(value.charCodeAt(0)));

    return String.fromCharCode(...hashCodeInts);
}

export default function ExternDeclaration(this: Compiler, node: ASTNode, parent: ASTNode): void  {
    const params = [];
    for (const param of node.params) {
        if (param.type.arrayType === false) {
            params.push(this.convertType(param.type.baseType));
        } else {
            const r = this.resolveArrayParam(param);
            
            params.push(r);
        }
    }
    //const fnName = node.name.name + hash(String(Math.random() * 12345));

    const callee = this.module.getOrInsertFunction(
        node.name.name,
        FunctionType.get(this.convertType(node.valType.baseType), params, true)
    );
    const fn = this.module.getFunction(node.name.name);
    //const fn = this.module.getFunction();
    if(this.functions[node.name.name])
        this.functions[node.name.name].push(new LetterFunction(node.name.name, node.name.name, fn.getReturnType(), params, fn, callee.getFunctionType()));
    else
        this.functions[node.name.name] = [new LetterFunction(node.name.name, node.name.name, fn.getReturnType(), params, fn, callee.getFunctionType())];
}