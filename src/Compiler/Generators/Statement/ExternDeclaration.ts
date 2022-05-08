import { FunctionType } from "llvm-bindings";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function ExternDeclaration(this: Compiler, node, types: Object = { ...LetterTypes }): void  {
    const params = [];
    for (const param of node.params) {
        if (param.type.arrayType === false) {
            params.push(this.convertType(param.type.type));
        } else {
            const r = this.resolveArrayParam(param);
            
            params.push(r);
        }
    }
    
    this.module.getOrInsertFunction(
        node.name.name,
        FunctionType.get(this.convertType(node.type.type), params, true) 
    );
}