"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Type_1 = require("./Type");
const Int_1 = require("./Int");
const Float_1 = require("./Float");
const Double_1 = require("./Double");
const Char_1 = require("./Char");
const String_1 = require("./String");
const LetterTypes = {
    integer: Int_1.default,
    float: Float_1.default,
    double: Double_1.default,
    char: Char_1.default,
    string: String_1.default,
};
exports.LetterType = Type_1.default;
exports.LetterInt = Int_1.default;
exports.LetterFloat = Float_1.default;
exports.LetterDouble = Double_1.default;
exports.LetterChar = Char_1.default;
exports.LetterString = String_1.default;
exports.default = LetterTypes;
