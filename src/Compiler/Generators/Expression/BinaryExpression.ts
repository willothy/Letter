import { Type } from "llvm-bindings";
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";
import LetterType from "../../Types/Type";

export default function BinaryExpression(this: Compiler, node: any, symbols: Object, fn: llvm.Function, parent: ASTNode) {
    let left = this.codegen(node.left, symbols, fn, parent);
    let right = this.checkType(this.codegen(node.right, symbols, fn, node), left.getType());
    
    const typeId = this.getKeyByValue(Type.TypeID, left.getType().getTypeID()).toLowerCase();
   
    const typeName = typeId.slice(0, typeId.length - 4);
    const typeInterface: LetterType = this.types[typeName];

    if (node.operator === '+') {
        return typeInterface.add(left, right, this.builder);
    } else if (node.operator === '-') {
        return typeInterface.sub(left, right, this.builder);
    } else if (node.operator === '*') {
        return typeInterface.mul(left, right, this.builder);
    } else if (node.operator === '/') {
        return typeInterface.div(left, right, this.builder);
    }
}