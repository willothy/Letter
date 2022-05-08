import LetterType from './Type';

function create () {

}

function add () {

}

function access (index: number, end?: number) {

}

const LetterString = new LetterType('string', create, {
    add,
    access,
});

export default LetterString;