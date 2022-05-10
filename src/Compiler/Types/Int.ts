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

function equal (left, right, builder: IRBuilder) {
    return builder.CreateICmpEQ(left, right, 'int_cmp_eq');
}

const LetterInt = new LetterType('int', create, {
    add,
    sub,
    mul,
    div,
    equal,
});

export default LetterInt;