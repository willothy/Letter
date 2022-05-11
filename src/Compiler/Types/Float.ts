import { IRBuilder } from 'llvm-bindings';
import LetterType from './Type';

function create () {

}

function add (left, right, builder: IRBuilder) {
    return builder.CreateFAdd(left, right, 'flt_addtmp');
}

function sub (left, right, builder: IRBuilder) {
    return builder.CreateFSub(left, right, 'flt_subtmp');
}

function mul (left, right, builder: IRBuilder) {
    return builder.CreateFMul(left, right, 'flt_multmp');
}

function div (left, right, builder: IRBuilder) {
    return builder.CreateFDiv(left, right, 'flt_divtmp');
}

function equal(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOEQ(left, right, 'flt_cmp_eq');
}

function notEqual(left, right, builder: IRBuilder) {
    return builder.CreateFCmpONE(left, right, 'flt_cmp_ne');
}

function strictEqual(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'flt_cmp_seq');
}

function strictNotEqual(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'flt_cmp_sne');
}

function lessThan(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'flt_cmp_lt');
}

function greaterThan(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'flt_cmp_gt');
}

function greaterOrEqual(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'flt_cmp_ge');
}

function lessOrEqual(left, right, builder: IRBuilder) {
    return builder.CreateFCmpOLE(left, right, 'flt_cmp_le');
}

const LetterFloat = new LetterType('float', create, {
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

export default LetterFloat;