import { FunctionType, Function, ConstantExpr, ConstantPointerNull, Constant } from "llvm-bindings";
import { ASTNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterFunction from "../../Function/Function";
import LetterTypes from "../../Types";

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