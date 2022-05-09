import { ConstantFP, ConstantInt } from "llvm-bindings";
import llvm = require("llvm-bindings");
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";

export default function NumericLiteral(this: Compiler, node: ASTNode, fn: llvm.Function, parent: ASTNode) {
    if (parent.type === 'ReturnStatement') {        
        return this.checkType(ConstantFP.get(this.builder.getDoubleTy(), node.value), fn.getReturnType());
    } else {
        return node.valType === 'INTEGER' ? 
            ConstantInt.get(this.builder.getInt32Ty(), node.value, true) 
            : ConstantFP.get(this.builder.getDoubleTy(), node.value);
    }
}