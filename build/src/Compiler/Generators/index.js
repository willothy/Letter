"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Program_1 = require("./Program/Program");
const BlockStatement_1 = require("./Statement/BlockStatement");
const ReturnStatement_1 = require("./Statement/ReturnStatement");
const FunctionDeclaration_1 = require("./Statement/FunctionDeclaration");
const ExpressionStatement_1 = require("./Statement/ExpressionStatement");
const ExternDeclaration_1 = require("./Statement/ExternDeclaration");
const VariableStatement_1 = require("./Statement/VariableStatement");
const CallExpression_1 = require("./Expression/CallExpression");
const AssignmentExpression_1 = require("./Expression/AssignmentExpression");
const BinaryExpression_1 = require("./Expression/BinaryExpression");
const Identifier_1 = require("./Expression/Identifier");
const NumericLiteral_1 = require("./Literal/NumericLiteral");
const CharLiteral_1 = require("./Literal/CharLiteral");
const StringLiteral_1 = require("./Literal/StringLiteral");
const Generators = {
    Program: Program_1.default,
    BlockStatement: BlockStatement_1.default,
    ReturnStatement: ReturnStatement_1.default,
    FunctionDeclaration: FunctionDeclaration_1.default,
    ExpressionStatement: ExpressionStatement_1.default,
    ExternDeclaration: ExternDeclaration_1.default,
    VariableStatement: VariableStatement_1.default,
    CallExpression: CallExpression_1.default,
    AssignmentExpression: AssignmentExpression_1.default,
    BinaryExpression: BinaryExpression_1.default,
    Identifier: Identifier_1.default,
    NumericLiteral: NumericLiteral_1.default,
    CharLiteral: CharLiteral_1.default,
    StringLiteral: StringLiteral_1.default
};
exports.default = Generators;
