import { Function, FunctionType, Type } from "llvm-bindings";

export default class LetterFunction {
    baseName: string;
    name: string;
    returnType: Type;
    argTypes: Type[];

    llvm: Function;
    fnType: FunctionType;
    
    constructor(baseName: string, name: string, returnType: Type, argTypes: Type[], llvm: Function, fnType: FunctionType) {
        this.baseName = baseName;
        this.name = name;
        this.returnType = returnType;
        this.argTypes = argTypes;
        this.llvm = llvm;
        this.fnType = fnType;
    }
}