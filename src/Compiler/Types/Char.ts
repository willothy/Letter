import { IRBuilder } from 'llvm-bindings';
import LetterType from './Type';

function create () {
    
}

function add (left, right, builder: IRBuilder) {
    return builder.CreateAdd(left, right, 'chr_addtmp');
}

function sub (left, right, builder: IRBuilder) {
    return builder.CreateSub(left, right, 'chr_subtmp');
}

function mul (left, right, builder: IRBuilder) {
    return builder.CreateMul(left, right, 'chr_multmp');
}

function div (left, right, builder: IRBuilder) {
    return builder.CreateSDiv(left, right, 'chr_divtmp');
}

function equal(left, right, builder: IRBuilder) {
    return builder.CreateICmpEQ(left, right, 'chr_cmp_eq');
}

function notEqual(left, right, builder: IRBuilder) {
    return builder.CreateICmpNE(left, right, 'chr_cmp_ne');
}

function strictEqual(left, right, builder: IRBuilder) {
    return builder.CreateICmpEQ(left, right, 'chr_cmp_seq');
}

function strictNotEqual(left, right, builder: IRBuilder) {
    return builder.CreateICmpNE(left, right, 'chr_cmp_sne');
}

function lessThan(left, right, builder: IRBuilder) {
    return builder.CreateICmpULT(left, right, 'chr_cmp_lt');
}

function greaterThan(left, right, builder: IRBuilder) {
    return builder.CreateICmpUGT(left, right, 'chr_cmp_gt');
}

function greaterOrEqual(left, right, builder: IRBuilder) {
    return builder.CreateICmpUGE(left, right, 'chr_cmp_ge');
}

function lessOrEqual(left, right, builder: IRBuilder) {
    return builder.CreateICmpULE(left, right, 'chr_cmp_le');
}

const LetterChar = new LetterType('char', create, {
    add,
    sub,
    mul,
    div,
    equal,
    notEqual,
    strictEqual,
    strictNotEqual,
    lessThan,
    greaterThan,
    lessOrEqual,
    greaterOrEqual
});

export default LetterChar;