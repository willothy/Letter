import LetterType from './Type';

function create () {

}

function add () {

}

function sub () {

}

function mul () {

}

function div () {

}

const LetterDouble = new LetterType('double', create, {
    add,
    sub,
    mul,
    div
});

export default LetterDouble;