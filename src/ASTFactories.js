

// -------------------
// Default (JSON) AST factories
const JSONFactory = {
    Program(body) {
        return {
            type: 'Program',
            body,
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
            body,
        };
    },
    ExpressionStatement(expression) {
        return {
            type: 'ExpressionStatement',
            expression,
        };
    },
    StringLiteral(value) {
        return {
            type: 'StringLiteral',
            value,
        };
    },
    NumericLiteral(value) {
        return {
            type: 'NumericLiteral',
            value,
        };
    },
    BinaryExpression(operator, left, right) {
        return {
            type: 'BinaryExpression',
            operator,
            left,
            right,
        };
    },
    AssignmentExpression(operator, left, right) {
        return {
            type: 'AssignmentExpression',
            operator,
            left,
            right,
        };
    },
    VariableStatement(declarations) {
        return {
            type: 'VariableStatement',
            declarations,
        };
    },
    VariableDeclaration(id, init) {
        return {
            type: 'VariableDeclaration',
            id,
            init
        }
    },
    Identifier(name) {
        return {
            type: 'Identifier',
            name
        }
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
        return [operator, left, right];
    },
    AssignmentExpression(operator, left, right) {
        return [operator, left, right];
    },
    VariableStatement(declarations) {
        return ['let', declarations]
    },
    VariableDeclaration(id, init) {
        return [id, init];
    },
    Identifier(name) {
        return ['id', name];
    }
};

const Factories = {
    default: JSONFactory,
    JSONFactory,
    SExpressionFactory
}

module.exports = {Factories};