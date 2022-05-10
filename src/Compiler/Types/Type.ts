import * as llvm from "llvm-bindings";
import { IRBuilder, LLVMContext } from "llvm-bindings";

export default class LetterType {
    name: string;

    // new operator
    create?: () => any;

    // Math operators
    add?: (left, right, builder: IRBuilder) => any;
    sub?: (left, right, builder: IRBuilder) => any;
    mul?: (left, right, builder: IRBuilder) => any;
    div?: (left, right, builder: IRBuilder) => any;

    // Access operator
    access?: (start: number, end: number, builder: IRBuilder) => any;

    // Comparison operators
    equal?: (left, right, builder: IRBuilder) => any;
    notEqual?: (left, right, builder: IRBuilder) => any;
    strictEqual?: (left, right, builder: IRBuilder) => any;
    strictNotEqual?: (left, right, builder: IRBuilder) => any;
    lessThan?: (left, right, builder: IRBuilder) => any;
    greaterThan?: (left, right, builder: IRBuilder) => any;
    lessOrEqual?: (left, right, builder: IRBuilder) => any;
    greaterOrEqual?: (left, right, builder: IRBuilder) => any;

    constructor(name, create: () => any, {
        add,
        sub,
        mul,
        div,
        access,
        equal,
        notEqual,
        strictEqual,
        strictNotEqual,
        lessThan,
        greaterThan,
        lessOrEqual,
        greaterOrEqual
    }: {
        add?: (left, right, builder: IRBuilder) => any,
        sub?: (left, right, builder: IRBuilder) => any,
        mul?: (left, right, builder: IRBuilder) => any,
        div?: (left, right, builder: IRBuilder) => any,
        access?: (start: number, end: number, builder: IRBuilder) => any,
        equal?: (left, right, builder: IRBuilder) => any,
        notEqual?: (left, right, builder: IRBuilder) => any,
        strictEqual?: (left, right, builder: IRBuilder) => any,
        strictNotEqual?: (left, right, builder: IRBuilder) => any,
        lessThan?: (left, right, builder: IRBuilder) => any,
        greaterThan?: (left, right, builder: IRBuilder) => any,
        lessOrEqual?: (left, right, builder: IRBuilder) => any,
        greaterOrEqual?: (left, right, builder: IRBuilder) => any,
    } = {}) {
        this.name = name;

        this.create = create;
        this.add = add;
        this.sub = sub;
        this.mul = mul;
        this.div = div;

        this.access = access;

        this.equal = equal;
        this.notEqual = notEqual;
        this.strictEqual = strictEqual;
        this.strictNotEqual = strictNotEqual;
        this.lessThan = lessThan;
        this.greaterThan = greaterThan;
        this.lessOrEqual = lessOrEqual;
        this.greaterOrEqual = greaterOrEqual;
    }
}