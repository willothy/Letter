import Program from './Program/Program';

import BlockStatement from './Statement/BlockStatement';
import ReturnStatement from './Statement/ReturnStatement';
import FunctionDeclaration from './Statement/FunctionDeclaration';
import ExpressionStatement from './Statement/ExpressionStatement';
import ExternDeclaration from './Statement/ExternDeclaration';
import VariableStatement from './Statement/VariableStatement';

import CallExpression from './Expression/CallExpression';
import AssignmentExpression from './Expression/AssignmentExpression';
import BinaryExpression from './Expression/BinaryExpression';
import Identifier from './Expression/Identifier';

import NumericLiteral from './Literal/NumericLiteral';
import CharLiteral from './Literal/CharLiteral';
import StringLiteral from './Literal/StringLiteral';
import BoolLiteral from './Literal/BoolLiteral';

import LogicalExpression from './Expression/LogicalExpression';
import IfStatement from './ControlFlow/IfStatement';

const Generators = {
    Program,
    BlockStatement,
    ReturnStatement,
    FunctionDeclaration,
    ExpressionStatement,
    ExternDeclaration,
    VariableStatement,
    CallExpression,
    AssignmentExpression,
    BinaryExpression,
    Identifier,
    NumericLiteral,
    CharLiteral,
    StringLiteral,
    BoolLiteral,
    LogicalExpression,
    IfStatement
}

export default Generators;