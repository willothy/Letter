//import llvm from "llvm-bindings";

import llvm from "llvm-bindings";

/**
 * Int primitive
 */
class LetterInteger {
    value: llvm.Value;
    builder: llvm.IRBuilder;
    
    constructor(value, builder: llvm.IRBuilder) {
        this.value = value;
        this.builder = builder;
    }

    add() {
        //return this.builder.CreateAdd
    }

    sub() {

    }

    mul() {

    }

    div() {

    }
}


module.exports = {
    LetterInteger
};