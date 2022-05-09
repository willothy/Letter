import { ConstantInt } from "llvm-bindings";
import llvm = require("llvm-bindings");
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function VariableStatement(this: Compiler, node: ASTNode, symbols, types: Object, fn: llvm.Function, parent: ASTNode): void  {
    for (const declaration of node.declarations) {
        const type = this.convertType(declaration.valType.baseType)
        const alloc = this.builder.CreateAlloca(
            type, 
            ConstantInt.get(this.builder.getInt8Ty(), 0, false), 
            declaration.id.name
        ); 
        
        if (declaration.init) {
            symbols[declaration.id.name] = {
                name: declaration.id.name,
                type: type,
                alloc: alloc
            }
            this.builder.CreateStore(
                this.checkType(
                    this.codegen(declaration.init, symbols, types, fn, node),
                    type
                ),
                alloc
            );
        }
    }
}