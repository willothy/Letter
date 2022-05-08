import LetterType from './Type';
import LetterInt from './Int'
import LetterFloat from './Float'
import LetterDouble from './Double'
import LetterChar from './Char'
import LetterString from './String'

const LetterTypes = {
    integer: LetterInt,
    float: LetterFloat,
    double: LetterDouble,
    char: LetterChar,
    string: LetterString,
};

exports.LetterType = LetterType;
exports.LetterInt = LetterInt;
exports.LetterFloat = LetterFloat;
exports.LetterDouble = LetterDouble;
exports.LetterChar = LetterChar;
exports.LetterString = LetterString;

export default LetterTypes;