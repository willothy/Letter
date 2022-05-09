"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Type_1 = require("./Type");
function create() {
}
function add() {
}
function access(index, end) {
}
const LetterString = new Type_1.default('string', create, {
    add,
    access,
});
exports.default = LetterString;
