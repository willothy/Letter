"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LetterType {
    constructor(name, create, { add, sub, mul, div, access, } = {}) {
        this.name = name;
        this.create = create;
        this.add = add;
        this.sub = sub;
        this.mul = mul;
        this.div = div;
        this.access = access;
    }
}
exports.default = LetterType;
