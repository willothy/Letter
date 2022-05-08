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

const LetterChar = new LetterType('char', create, {
    add,
    sub,
    mul,
    div
});

export default LetterChar;