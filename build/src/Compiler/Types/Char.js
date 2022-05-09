"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Type_1 = require("./Type");
function create() {
}
function add() {
}
function sub() {
}
function mul() {
}
function div() {
}
const LetterChar = new Type_1.default('char', create, {
    add,
    sub,
    mul,
    div
});
exports.default = LetterChar;
