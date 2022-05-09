"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Type_1 = require("./Type");
function create() {
}
function add(left, right, builder) {
    return builder.CreateFAdd(left, right, 'flt_addtmp');
}
function sub(left, right, builder) {
    return builder.CreateFSub(left, right, 'flt_subtmp');
}
function mul(left, right, builder) {
    return builder.CreateFMul(left, right, 'flt_multmp');
}
function div(left, right, builder) {
    return builder.CreateFDiv(left, right, 'flt_divtmp');
}
const LetterDouble = new Type_1.default('double', create, {
    add,
    sub,
    mul,
    div
});
exports.default = LetterDouble;
