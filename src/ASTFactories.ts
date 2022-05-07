

// -------------------
// Default (JSON) AST factories
const JSONFactory = {
    Program(body): {type: string;
body: any;
}  {
        return {
            type: 'Program',
            body,
        };
    },
    EmptyStatement(): {type: string;
} {
        return {
            type: 'EmptyStatement'
        };
    },
    BlockStatement(body): {type: string;
body: any;
}  {
        return {
            type: 'BlockStatement',
            body,
        };
    },
    ExpressionStatement(expression): {type: string;
expression: any;
}  {
        return {
            type: 'ExpressionStatement',
            expression,
        };
    },
    StringLiteral(value): {type: string;
value: any;
}  {
        return {
            type: 'StringLiteral',
            value,
        };
    },
    CharLiteral(value): {type: string;
value: any;
}  {
        return {
            type: 'CharLiteral',
            value,
        };
    },
    NumericLiteral(value): {type: string;
value: any;
}  {
        return {
            type: 'NumericLiteral',
            value,
        };
    },
    BinaryExpression(operator, left, right): {type: string;
operator: any;
left: any;
right: any;
}  {
        return {
            type: 'BinaryExpression',
            operator,
            left,
            right,
        };
    },
    AssignmentExpression(operator, left, right): {type: string;
operator: any;
left: any;
right: any;
}  {
        return {
            type: 'AssignmentExpression',
            operator,
            left,
            right,
        };
    },
    VariableStatement(declarations): {type: string;
declarations: any;
}  {
        return {
            type: 'VariableStatement',
            declarations,
        };
    },
    VariableDeclaration(id, type, init): {type: string;
id: any;
valType: any;
init: any;
}  {
        return {
            type: 'VariableDeclaration',
            id: id,
            valType: type,
            init
        }
    },
    Identifier(name): {type: string;
name: any;
}  {
        return {
            type: 'Identifier',
            name
        }
    },
    IfStatement(test, consequent, alternate): {type: string;
test: any;
consequent: any;
alternate: any;
}  {
        return {
            type: 'IfStatement',
            test,
            consequent,
            alternate
        };
    },
    BooleanLiteral(value): {type: string;
value: any;
}  {
        return {
            type: 'BooleanLiteral',
            value 
        };
    },
    NullLiteral(): {type: string;
value: any;
}  {
        return {
            type: 'NullLiteral',
            value: null
        };
    },
    LogicalExpression(operator, left, right): {type: string;
operator: any;
left: any;
right: any;
}  {
        return {
            type: 'LogicalExpression',
            operator,
            left,
            right
        };
    },
    UnaryExpression(operator, argument): {type: string;
operator: any;
argument: any;
}  {
        return {
            type: 'UnaryExpression',
            operator,
            argument
        };
    },
    WhileStatement(test, body): {type: string;
test: any;
body: any;
}  {
        return {
            type: 'WhileStatement',
            test,
            body
        }
    },
    DoWhileStatement(body, test): {type: string;
body: any;
test: any;
}  {
        return {
            type: 'DoWhileStatement',
            body,
            test
        };
    },
    ForStatement(init, test, update, body): {type: string;
init: any;
test: any;
update: any;
body: any;
}  {
        return {
            type: 'ForStatement',
            init,
            test,
            update,
            body
        };
    },
    FunctionDeclaration(name, type, params, body): {type: string;
name: any;
returnType: any;
params: any;
body: any;
}  {
        return {
            type: 'FunctionDeclaration',
            name,
            returnType: type,
            params,
            body
        };
    },
    ExternDeclaration(name, type, params): {type: string;
name: any;
valType: any;
params: any;
}  {
        return {
            type: 'ExternDeclaration',
            name,
            valType: type,
            params
        };
    },
    ReturnStatement(argument): {type: string;
argument: any;
}  {
        return {
            type: 'ReturnStatement',
            argument
        };
    },
    MemberExpression(computed, object, property): {type: string;
computed: any;
object: any;
property: any;
}  {
        return {
            type: 'MemberExpression',
            computed,
            object,
            property
        };
    },
    CallExpression(callee, args): {type: string;
callee: any;
arguments: any;
}  {
        return {
            type: 'CallExpression',
            callee,
            arguments: args
        };
    },
    ClassDeclaration(id, superClass, body): {type: string;
id: any;
superClass: any;
body: any;
}  {
        return {
            type: 'ClassDeclaration',
            id,
            superClass,
            body
        };
    },
    ThisExpression(): {type: string;
}  {
        return {
            type: 'ThisExpression'
        };
    },
    Super(): {type: string;
}  {
        return {
            type: 'Super'
        };
    },
    NewExpression(callee, args): {type: string;
callee: any;
arguments: any;
}  {
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
    EmptyStatement(): void  {},
    BlockStatement(body) {
        return ['begin', body];
    },
    ExpressionStatement(expression) {
        return expression;
    },
    StringLiteral(value): string  {
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
    ThisExpression(): string  {
        return 'this';
    },
    Super(): string  {
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
