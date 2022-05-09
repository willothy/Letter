import { FunctionType } from "llvm-bindings";
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
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
    
    this.module.getOrInsertFunction(
        node.name.name,
        FunctionType.get(this.convertType(node.valType.baseType), params, true) 
    );
}