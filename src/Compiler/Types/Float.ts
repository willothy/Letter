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

const LetterFloat = new LetterType('float', create, {
    add,
    sub,
    mul,
    div,
    equal
});

export default LetterFloat;