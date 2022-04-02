

// -------------------
// Default (JSON) AST factories
const JSONFactory = {
    Program(body) {
        return {
            type: 'Program',
            body
        };
    },
    EmptyStatement(){
        return {
            type: 'EmptyStatement'
        };
    },
    BlockStatement(body) {
        return {
            type: 'BlockStatement',
            body
        };
    },
    ExpressionStatement(expression) {
        return {
            type: 'ExpressionStatement',
            expression
        };
    },
    StringLiteral(value) {
        return {
            type: 'StringLiteral',
            value
        };
    },
    NumericLiteral(value) {
        return {
            type: 'NumericLiteral',
            value
        };
    },
    BinaryExpression(operator, left, right) {
        return {
            type: 'BinaryExpression',
            operator,
            left,
            right
        };
    }
};

// ------------------
// S-Expression AST factories
const SExpressionFactory = {
    Program(body) {
        return ['begin', body];
    },
    EmptyStatement() {},
    BlockStatement(body) {
        return ['begin', body];
    },
    ExpressionStatement(expression) {
        return expression;
    },
    StringLiteral(value) {
        return `"${value}"`;
    },
    NumericLiteral(value) {
        return value;
    },
    BinaryExpression(operator, left, right) {
        return [left, operator, right];
    }
};

const Factories = {
    default: JSONFactory,
    JSONFactory,
    SExpressionFactory
}

module.exports = {Factories};