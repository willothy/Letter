

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
    CharLiteral(value) {
        return {
            type: 'CharLiteral',
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
    VariableDeclaration(id, type, init) {
        return {
            type: 'VariableDeclaration',
            id: id,
            valType: type,
            init
        }
    },
    Identifier(name) {
        return {
            type: 'Identifier',
            name
        }
    },
    IfStatement(test, consequent, alternate) {
        return {
            type: 'IfStatement',
            test,
            consequent,
            alternate
        };
    },
    BooleanLiteral(value) {
        return {
            type: 'BooleanLiteral',
            value 
        };
    },
    NullLiteral() {
        return {
            type: 'NullLiteral',
            value: null
        };
    },
    LogicalExpression(operator, left, right) {
        return {
            type: 'LogicalExpression',
            operator,
            left,
            right
        };
    },
    UnaryExpression(operator, argument) {
        return {
            type: 'UnaryExpression',
            operator,
            argument
        };
    },
    WhileStatement(test, body) {
        return {
            type: 'WhileStatement',
            test,
            body
        }
    },
    DoWhileStatement(body, test) {
        return {
            type: 'DoWhileStatement',
            body,
            test
        };
    },
    ForStatement(init, test, update, body) {
        return {
            type: 'ForStatement',
            init,
            test,
            update,
            body
        };
    },
    FunctionDeclaration(name, type, params, body) {
        return {
            type: 'FunctionDeclaration',
            name,
            returnType: type,
            params,
            body
        };
    },
    ExternDeclaration(name, type, params) {
        return {
            type: 'ExternDeclaration',
            name,
            valType: type,
            params
        };
    },
    ReturnStatement(argument) {
        return {
            type: 'ReturnStatement',
            argument
        };
    },
    MemberExpression(computed, object, property) {
        return {
            type: 'MemberExpression',
            computed,
            object,
            property
        };
    },
    CallExpression(callee, args) {
        return {
            type: 'CallExpression',
            callee,
            arguments: args
        };
    },
    ClassDeclaration(id, superClass, body) {
        return {
            type: 'ClassDeclaration',
            id,
            superClass,
            body
        };
    },
    ThisExpression() {
        return {
            type: 'ThisExpression'
        };
    },
    Super() {
        return {
            type: 'Super'
        };
    },
    NewExpression(callee, args) {
        return {
            type: 'NewExpression',
            callee,
            arguments: args
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
    },
    IfStatement(test, consequent, alternate) {
        return ['if', test, consequent, 'else', alternate];
    },
    BooleanLiteral(value) {
        return value;
    },
    NullLiteral() {
        return null;
    },
    LogicalExpression(operator, left, right) {
        return [operator, left, right];
    },
    UnaryExpression(operator, argument) {
        return [
            operator,
            argument
        ];
    },
    WhileStatement(test, body) {
        return [
            'while',
            test,
            body
        ];
    },
    DoWhileStatement(body, test) {
        return [
            'do',
            body,
            'while',
            test
        ];
    },
    FunctionDeclaration(name, params, body) {
        return [
            'proc',
            name,
            params,
            body
        ];
    },
    ReturnStatement(argument) {
        return [
            'return',
            argument
        ];
    },
    MemberExpression(computed, object, property) {
        return [
            'member',
            computed,
            object,
            property
        ];
    },
    CallExpression(callee, args) {
        return [
            'call',
            callee,
            args
        ];
    },
    ClassDeclaration(id, superClass, body) {
        return [
            'class',
            id,
            superClass,
            body
        ];
    },
    ThisExpression() {
        return 'this';
    },
    Super() {
        return 'super';
    },
    NewExpression(callee, args) {
        return [
            'new',
            callee,
            args
        ];
    }
};

const Factories = {
    default: JSONFactory,
    JSONFactory,
    SExpressionFactory
}

export default Factories;
