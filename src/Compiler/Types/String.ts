import { ArrayType, IRBuilder } from 'llvm-bindings';
import LetterType from './Type';

function create() {

}

function add() {

}

function access(array, index: number, end: number, builder: IRBuilder) {
    if (end == null) {
        /*const strType = ArrayType.get(
            builder.getInt8Ty(), 
            array.length
        );
        const chrPtr = builder.CreateGEP(
            strType, 
            array.value,
            [
                this.builder.getInt32(0), 
                this.builder.getInt32(index)
            ],
            'str_access_chr'
        );

        return builder.CreateLoad(builder.getInt8Ty(), chrPtr);*/
        return builder.CreateExtractValue(
            array.value, 
            [index]
        );
    } else {

    }
}

const LetterString = new LetterType('string', create, {
    add,
    access,
});

export default LetterString;