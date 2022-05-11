import { IRBuilder } from 'llvm-bindings';
import LetterType from './Type';

function create () {

}

function add (left, right, builder: IRBuilder) {
    return builder.CreateAdd(left, right, 'int_addtmp');
}

function sub (left, right, builder: IRBuilder) {
    return builder.CreateSub(left, right, 'int_subtmp');
}

function mul (left, right, builder: IRBuilder) {
    return builder.CreateMul(left, right, 'int_multmp');
}

function div (left, right, builder: IRBuilder) {
    return builder.CreateSDiv(left, right, 'int_divtmp');
}

function equal(left, right, builder: IRBuilder) {
    return builder.CreateICmpEQ(left, right, 'int_cmp_eq');
}

function notEqual(left, right, builder: IRBuilder) {
    return builder.CreateICmpNE(left, right, 'int_cmp_ne');
}

function strictEqual(left, right, builder: IRBuilder) {
    return builder.CreateICmpEQ(left, right, 'int_cmp_seq');
}

function strictNotEqual(left, right, builder: IRBuilder) {
    return builder.CreateICmpNE(left, right, 'int_cmp_sne');
}

function lessThan(left, right, builder: IRBuilder) {
    return builder.CreateICmpSLT(left, right, 'int_cmp_lt');
}

function greaterThan(left, right, builder: IRBuilder) {
    return builder.CreateICmpSGT(left, right, 'int_cmp_gt');
}

function greaterOrEqual(left, right, builder: IRBuilder) {
    return builder.CreateICmpSGE(left, right, 'int_cmp_ge');
}

function lessOrEqual(left, right, builder: IRBuilder) {
    return builder.CreateICmpSLE(left, right, 'int_cmp_le');
}


const LetterInt = new LetterType('int', create, {
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

export default LetterInt;