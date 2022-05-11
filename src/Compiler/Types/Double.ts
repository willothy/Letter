import { IRBuilder } from 'llvm-bindings';
import LetterType from './Type';

function create () {

}

function add (left, right, builder: IRBuilder) {
    return builder.CreateFAdd(left, right, 'dbl_addtmp');
}

function sub (left, right, builder: IRBuilder) {
    return builder.CreateFSub(left, right, 'dbl_subtmp');
}

function mul (left, right, builder: IRBuilder) {
    return builder.CreateFMul(left, right, 'dbl_multmp');
}

function div (left, right, builder: IRBuilder) {
    return builder.CreateFDiv(left, right, 'dbl_divtmp');
}

function equal(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOEQ(left, right, 'dbl_cmp_eq');
}

function notEqual(left, right, builder: IRBuilder) {
    return builder.CreateFCmpONE(left, right, 'dbl_cmp_ne');
}

function strictEqual(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'dbl_cmp_seq');
}

function strictNotEqual(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'dbl_cmp_sne');
}

function lessThan(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'dbl_cmp_lt');
}

function greaterThan(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'dbl_cmp_gt');
}

function greaterOrEqual(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'dbl_cmp_ge');
}

function lessOrEqual(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'dbl_cmp_le');
}

const LetterDouble = new LetterType('double', create, {
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

export default LetterDouble;