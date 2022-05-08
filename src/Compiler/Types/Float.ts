import { IRBuilder } from 'llvm-bindings';
import LetterType from './Type';

function create () {

}

function add (left, right, builder: IRBuilder) {

}

function sub (left, right, builder: IRBuilder) {

}

function mul (left, right, builder: IRBuilder) {

}

function div (left, right, builder: IRBuilder) {

}

const LetterFloat = new LetterType('float', create, {
    add,
    sub,
    mul,
    div
});

export default LetterFloat;