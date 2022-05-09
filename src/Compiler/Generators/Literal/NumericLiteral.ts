import { ConstantFP, ConstantInt } from "llvm-bindings";
import llvm = require("llvm-bindings");
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";

export default function NumericLiteral(this: Compiler, node: ASTNode, fn: llvm.Function, parent: ASTNode) {
    if (parent.type === 'ReturnStatement') { 
        return node.valType === 'INTEGER' ? 
            this.checkType(ConstantInt.get(this.builder.getInt32Ty(), node.value, true), fn.getReturnType())
            : this.checkType(ConstantFP.get(this.builder.getDoubleTy(), node.value), fn.getReturnType());       
    } else if (parent.type === 'CallExpression') {
        const parentFunction = this.module.getFunction(parent.callee.name);
        return node.valType === 'INTEGER' ? 
            this.checkType(ConstantInt.get(this.builder.getInt32Ty(), node.value, true), parentFunction.getArg(parent.extraContext['argPos']).getType())
            : this.checkType(ConstantFP.get(this.builder.getDoubleTy(), node.value), parentFunction.getArg(parent.extraContext['argPos']).getType());     
    } else if (parent.extraContext && parent.extraContext['varType']) {
        return node.valType === 'INTEGER' ? 
            this.checkType(ConstantInt.get(this.builder.getInt32Ty(), node.value, true), parent.extraContext['varType'])
            : this.checkType(ConstantFP.get(this.builder.getDoubleTy(), node.value), parent.extraContext['varType']);
    } else {
        return node.valType === 'INTEGER' ? 
            ConstantInt.get(this.builder.getInt32Ty(), node.value, true) 
            : ConstantFP.get(this.builder.getDoubleTy(), node.value);
    }
}