import { Type, Function } from "llvm-bindings";
import { ASTNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";
import LetterType from "../../Types/Type";

export default function BinaryExpression(this: Compiler, node: any, symbols: Object, fn: Function, parent: ASTNode) {
    let left = this.codegen(node.left, symbols, fn, parent);
    let right = this.checkType(this.codegen(node.right, symbols, fn, node), left.getType());
    
    const typeId = this.getKeyByValue(Type.TypeID, left.getType().getTypeID()).toLowerCase();
   
    const typeName = typeId.slice(0, typeId.length - 4);
    const typeInterface: LetterType = this.types[typeName];

    switch (node.operator) {
        case '+':
            return typeInterface.add(left, right, this.builder);
        case '-':
            return typeInterface.sub(left, right, this.builder);
        case '*':
            return typeInterface.mul(left, right, this.builder);
        case '/':
            return typeInterface.div(left, right, this.builder);
        case '==':
            return typeInterface.equal(left, right, this.builder);
        case '!=':
            return typeInterface.notEqual(left, right, this.builder);
        case '===':
            return typeInterface.strictEqual(left, right, this.builder);
        case '!==':
            return typeInterface.strictNotEqual(left, right, this.builder);
        case '<':
            return typeInterface.lessThan(left, right, this.builder);
        case '>':
            return typeInterface.greaterThan(left, right, this.builder);
        case '<=':
            return typeInterface.lessOrEqual(left, right, this.builder);
        case '>=':
            return typeInterface.greaterOrEqual(left, right, this.builder);
    }
}