"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Type_1 = require("./Type");
function create() {
}
function add(left, right, builder) {
    return builder.CreateAdd(left, right, 'int_addtmp');
}
function sub(left, right, builder) {
    return builder.CreateSub(left, right, 'int_subtmp');
}
function mul(left, right, builder) {
    return builder.CreateMul(left, right, 'int_multmp');
}
function div(left, right, builder) {
    return builder.CreateSDiv(left, right, 'int_divtmp');
}
const LetterInt = new Type_1.default('int', create, {
    add,
    sub,
    mul,
    div
});
exports.default = LetterInt;
