import { Type } from "llvm-bindings";

export default function BinaryExpression(this, node: any, symbols: Object, fn: llvm.Function) {
    let left = this.codegen(node.left, symbols, fn);
    let right = this.codegen(node.right, symbols, fn);

    const leftType = left.getType();
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
    }
}