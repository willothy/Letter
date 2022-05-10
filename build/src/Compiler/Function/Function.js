"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LetterFunction {
    constructor(baseName, name, returnType, argTypes, llvm, fnType) {
        this.baseName = baseName;
        this.name = name;
        this.returnType = returnType;
        this.argTypes = argTypes;
        this.llvm = llvm;
        this.fnType = fnType;
    }
}
exports.default = LetterFunction;
