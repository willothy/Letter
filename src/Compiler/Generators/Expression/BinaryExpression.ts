import { Type } from "llvm-bindings";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";
import LetterType from "../../Types/Type";

export default function BinaryExpression(this: Compiler, node: any, symbols: Object, types: Object = { ...LetterTypes }, fn: llvm.Function) {
    let left = this.codegen(node.left, symbols, fn);
    let right = this.checkType(this.codegen(node.right, symbols, fn), left.getType());
    
    const typeId = this.getKeyByValue(Type.TypeID, left.getType().getTypeID()).toLowerCase();
    const typeName = typeId.slice(0, typeId.length - 4);
    //console.log(typeName);
    const typeInterface: LetterType = types[typeName];
    //console.log(typeInterface);

    if (node.operator === '+') {
        return typeInterface.add(left, right, this.builder);
    } else if (node.operator === '-') {
        return typeInterface.sub(left, right, this.builder);
    } else if (node.operator === '*') {
        return typeInterface.mul(left, right, this.builder);
    } else if (node.operator === '/') {
        return typeInterface.div(left, right, this.builder);
    }

    /*const leftType = left.getType();
    const rightType = right.getType();
    
    if (Type.isSameType(leftType, rightType)) {
        if (leftType.isIntegerTy(32)) {
            if (node.operator === '+') {
                return this.builder.CreateAdd(left, right, 'addtmp');
            } else if (node.operator === '-') {
                return this.builder.CreateSub(left, right, 'subtmp');
            } else if (node.operator === '*') {
                return this.builder.CreateMul(left, right, 'multmp');
            } else if (node.operator === '/') {
                return this.builder.CreateSDiv(left, right, 'divtmp');
            }
        } else {
            if (node.operator === '+') {
                return this.builder.CreateFAdd(left, right, 'faddtmp');
            } else if (node.operator === '-') {
                return this.builder.CreateFSub(left, right, 'fsubtmp');
            } else if (node.operator === '*') {
                return this.builder.CreateFMul(left, right, 'fmultmp');
            } else if (node.operator === '/') {
                return this.builder.CreateFDiv(left, right, 'fdivtmp');
            }
        }
    } else {
        if (this.isFloat(left) || this.isFloat(right)) {
            left = this.isFloat(left) ? left : this.builder.CreateSIToFP(
                left, 
                this.builder.getFloatTy(), 
                'convleft'
            );
            right = this.isFloat(right) ? right : this.builder.CreateSIToFP(
                right, 
                this.builder.getFloatTy(), 
                'convright'
            );
            if (node.operator === '+') {
                return this.builder.CreateFAdd(left, right, 'faddtmp');
            } else if (node.operator === '-') {
                return this.builder.CreateFSub(left, right, 'fsubtmp');
            } else if (node.operator === '*') {
                return this.builder.CreateFMul(left, right, 'fmultmp');
            } else if (node.operator === '/') {
                return this.builder.CreateFDiv(left, right, 'fdivtmp');
            }
        } else {
            throw new Error("Cannot convert between types");
        }
    }*/
}