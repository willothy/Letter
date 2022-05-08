import * as llvm from "llvm-bindings";
import { IRBuilder, LLVMContext } from "llvm-bindings";

export default class LetterType {
    name: string;

    create?: () => any;
    add?: (left, right, builder: IRBuilder) => any;
    sub?: (left, right, builder: IRBuilder) => any;
    mul?: (left, right, builder: IRBuilder) => any;
    div?: (left, right, builder: IRBuilder) => any;
    access?: (start: number, end: number, builder: IRBuilder) => any;

    constructor(name, create: () => any, {
        add,
        sub,
        mul,
        div,
        access,
    }: {
        add?: (left, right, builder: IRBuilder) => any,
        sub?: (left, right, builder: IRBuilder) => any,
        mul?: (left, right, builder: IRBuilder) => any,
        div?: (left, right, builder: IRBuilder) => any,
        access?: (start: number, end: number, builder: IRBuilder) => any,
    } = {}) {
        this.name = name;

        this.create = create;
        this.add = add;
        this.sub = sub;
        this.mul = mul;
        this.div = div;

        this.access = access;
    }
}