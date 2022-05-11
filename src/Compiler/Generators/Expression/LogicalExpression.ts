import { Type } from "llvm-bindings";
import { ASTNode, LogicalExpressionNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";
import LetterType from "../../Types/Type";

export default function LogicalExpression(this: Compiler, node: ASTNode, symbols: Object, fn: llvm.Function, parent: ASTNode) {
    const boolType = this.builder.getInt1Ty();
    
    let left = this.checkType(this.codegen(node.left, symbols, fn, node), boolType);
    let right = this.checkType(this.codegen(node.right, symbols, fn, node), boolType);
    
    switch(node.operator) {
        case '&&':
            // Forces true when right-side condition is assumable true (i.e. 1 == 1.0)
            return this.builder.CreateAnd(left, right, 'and_tmp'); 
            /*return this.builder.CreateICmpEQ(
                this.builder.CreateICmpEQ(left, this.builder.getInt1(true)),
                this.builder.CreateICmpEQ(right, this.builder.getInt1(true))
            );*/
        case '||':
            return this.builder.CreateOr(left, right, 'or_tmp');
        default:
            throw new Error("Error compiling logical expression");
    }
}