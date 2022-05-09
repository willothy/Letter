import { APInt, ArrayType, ConstantInt } from "llvm-bindings";
import llvm = require("llvm-bindings");
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";

export default function StringLiteral(this: Compiler, node: ASTNode, fn: llvm.Function, parent: ASTNode) {
    const value = `${this.unbackslash(node.value)}\0`;
    /*const baseType = this.builder.getInt8Ty();
    const arrayType = ArrayType.get(baseType, value.length);
    const alloc = this.builder.CreateAlloca(arrayType);
    
    for (let i = 0; i < value.length; i++) {
        const char = value.charAt(i);
        const insideElementPtr = this.builder.CreateGEP(
            arrayType, 
            alloc, 
            [
                this.builder.getInt32(0), 
                this.builder.getInt32(i)
            ]
        );
        
        this.builder.CreateStore(
            ConstantInt.get(this.context, new APInt(8, char.charCodeAt(0), false)),
            insideElementPtr
        );
    }
    return this.builder.CreateGEP(
        arrayType, 
        alloc, 
        [
            this.builder.getInt32(0), 
            this.builder.getInt32(0)
        ]
    );*/
    return this.builder.CreateGlobalStringPtr(value, 'anon_str', 0, this.module);
}