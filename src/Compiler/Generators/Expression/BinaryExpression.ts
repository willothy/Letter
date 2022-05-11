import { Type, Function, PointerType } from "llvm-bindings";
import { ASTNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";
import LetterType from "../../Types/Type";

export default function BinaryExpression(this: Compiler, node: any, symbols: Object, fn: Function, parent: ASTNode) {
    const left = this.codegen(node.left, symbols, fn, parent);
    const right = this.codegen(node.right, symbols, fn, node);
    
    const leftType = left.getType();
    const typeId = this.getKeyByValue(Type.TypeID, leftType.getTypeID()).toLowerCase();
    const typeName = typeId.slice(0, typeId.length - 4);
    const typeInterface: LetterType = this.types[typeName];
    this.builder.CreatePtrDiff
    switch (node.operator) {
        case '+':
            return typeInterface.add(
                left, 
                this.checkType(right, leftType), 
                this.builder
            );
        case '-':
            return typeInterface.sub(
                left, 
                this.checkType(right, leftType), 
                this.builder
            );
        case '*':
            return typeInterface.mul(
                left, 
                this.checkType(right, leftType), 
                this.builder
            );
        case '/':
            return typeInterface.div(
                left, 
                this.checkType(right, leftType), 
                this.builder
            );
        case '==':
            return typeInterface.equal(
                left, 
                this.checkType(right, leftType), 
                this.builder
            );
        case '!=':
            return typeInterface.notEqual(
                left, 
                this.checkType(right, leftType), 
                this.builder
            );
        case '===':
            return this.builder.CreateICmpEQ(
                this.builder.CreatePtrDiff(left, this.checkType(right, leftType), 'strict_eq_diff'),
                this.builder.getInt64(0)
            );
            /*return typeInterface.strictEqual(
                left, 
                right, 
                this.builder
            );*/
        case '!==':
            return typeInterface.strictNotEqual(
                left, 
                right, 
                this.builder
            );
        case '<':
            return typeInterface.lessThan(
                left, 
                this.checkType(right, leftType), 
                this.builder
            );
        case '>':
            return typeInterface.greaterThan(
                left, 
                this.checkType(right, leftType), 
                this.builder
            );
        case '<=':
            return typeInterface.lessOrEqual(
                left, 
                this.checkType(right, leftType), 
                this.builder
            );
        case '>=':
            return typeInterface.greaterOrEqual(
                left, 
                this.checkType(right, leftType), 
                this.builder
            );
    }
}