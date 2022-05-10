
export interface ASTNode {
    type: string;
    body?: any;
    expression?: ASTNode;
    statement?: ASTNode;
    value?: any;
    left?: ASTNode;
    right?: ASTNode;
    operator?: string;
    declarations?: ASTNode[];
    id?: ASTNode;
    valType?: any;
    init?: ASTNode;
    argument?: ASTNode;
    args?: [];
    name?: any;
    test?: ASTNode;
    consequent?: ASTNode;
    alternate?: ASTNode;
    update?: any;
    returnType?: any;
    params?: any;
    computed?: any;
    object?: any;
    property?: any;
    callee?: any;
    superClass?: any;
    typeStr?: string;
    dimensions?: number;
    arrayType?: boolean;
    baseType?: string;

    extraContext?: Object;

    withContext: (context: Object) => ASTNode;
}

function _withContext(this: ASTNode, context: Object = {}) {
    this.extraContext = {
        ...this.extraContext,
        ...context
    };
    return this;
}

export class ProgramNode implements ASTNode {
    type: string = 'Program';
    body: ASTNode[];
    extraContext?: Object;

    constructor(body: ASTNode[]) {
        this.body = body;
    }

    withContext = _withContext;
}

export class EmptyStatementNode implements ASTNode {
    type: string = 'EmptyStatement';
    extraContext?: Object;

    withContext = _withContext;
}

export class BlockStatementNode implements ASTNode {
    type: string = 'BlockStatement';
    body: ASTNode[];
    extraContext?: Object;

    constructor(body: ASTNode[]) {
        this.body = body;
    }

    withContext = _withContext;
}

export class ExpressionStatementNode implements ASTNode {
    type: string = 'ExpressionStatement';
    expression: ASTNode;
    extraContext?: Object;

    constructor(expression: ASTNode) {
        this.expression = expression;
    }

    withContext = _withContext;
}

export class TypeNode implements ASTNode {
    type: string = 'Type';
    baseType: string;
    typeStr: string;
    arrayType: boolean;
    dimensions: number;
    extraContext?: Object;

    constructor(baseType: string, typeStr: string, arrayType: boolean, dimensions: number) {
        this.baseType = baseType;
        this.typeStr = typeStr;
        this.arrayType = arrayType;
        this.dimensions = dimensions;
    }

    withContext = _withContext;
}

export class BinaryExpressionNode implements ASTNode {
    type: string = 'BinaryExpression';
    operator: string;
    left: ASTNode;
    right: ASTNode;
    extraContext?: Object;

    constructor(operator: string, left: ASTNode, right: ASTNode) {
        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    withContext = _withContext;
}

export class AssignmentExpressionNode implements ASTNode {
    type: string = 'AssignmentExpression';
    operator: string;
    left: ASTNode;
    right: ASTNode;
    extraContext?: Object;

    constructor(operator: string, left: ASTNode, right: ASTNode) {
        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    withContext = _withContext;
}

export class VariableStatementNode implements ASTNode {
    type: string = 'VariableStatement';
    declarations: ASTNode[];
    extraContext?: Object;

    constructor(declarations: ASTNode[]) {
        this.declarations = declarations;
    }

    withContext = _withContext;
}

export class VariableDeclarationNode implements ASTNode {
    type: string = 'VariableDeclaration';
    id: ASTNode;
    valType: ASTNode;
    init: ASTNode;
    extraContext?: Object;

    constructor(id: ASTNode, valType: ASTNode, init: ASTNode) {
        this.id = id;
        this.valType = valType;
        this.init = init;
    }

    withContext = _withContext;
}

export class IdentifierNode implements ASTNode {
    type: string = 'Identifier';
    name: string;
    extraContext?: Object;

    constructor(name: string) {
        this.name = name;
    }

    withContext = _withContext;
}

export class IfStatementNode implements ASTNode {
    type: string = 'IfStatement';
    test: ASTNode;
    consequent: ASTNode;
    alternate: ASTNode;
    extraContext?: Object;

    constructor(test: ASTNode, consequent: ASTNode, alternate: ASTNode) {
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }

    withContext = _withContext;
}

export class StringLiteralNode implements ASTNode {
    type: string = 'StringLiteral';
    value: string;
    extraContext?: Object;

    constructor(value: string) {
        this.value = value;
    }

    withContext = _withContext;
}

export class CharLiteralNode implements ASTNode {
    type: string = 'CharLiteral';
    value: string;
    extraContext?: Object;

    constructor(value: string) {
        this.value = value;
    }

    withContext = _withContext;
}

export class NumericLiteralNode implements ASTNode {
    type: string = 'NumericLiteral';
    value: number;
    valType?: ASTNode;
    extraContext?: Object;

    constructor(valType, value: number) {
        this.valType = valType;
        this.value = value;
    }

    withContext = _withContext;
}

export class BooleanLiteralNode implements ASTNode {
    type: string = 'BooleanLiteral';
    value: boolean;
    extraContext?: Object;

    constructor(value: boolean) {
        this.value = value;
    }

    withContext = _withContext;
}

export class NullLiteralNode implements ASTNode {
    type: string = 'NullLiteral';
    value: null = null;
    extraContext?: Object;

    withContext = _withContext;
}

export class LogicalExpressionNode implements ASTNode {
    type: string = 'LogicalExpression';
    operator: string;
    left: ASTNode;
    right: ASTNode;
    extraContext?: Object;

    constructor(operator: string, left: ASTNode, right: ASTNode) {
        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    withContext = _withContext;
}

export class UnaryExpressionNode implements ASTNode {
    type: string = 'UnaryExpression';
    operator: string;
    argument: ASTNode;
    extraContext?: Object;

    constructor(operator: string, argument: ASTNode) {
        this.operator = operator;
        this.argument = argument;
    }

    withContext = _withContext;
}

export class WhileStatementNode implements ASTNode {
    type: string = 'WhileStatement';
    test: ASTNode;
    body: ASTNode;
    extraContext?: Object;

    constructor(test: ASTNode, body: ASTNode) {
        this.test = test;
        this.body = body;
    }

    withContext = _withContext;
}

export class DoWhileStatementNode implements ASTNode {
    type: string = 'DoWhileStatement';
    test: ASTNode;
    body: ASTNode;
    extraContext?: Object;

    constructor(test: ASTNode, body: ASTNode) {
        this.test = test;
        this.body = body;
    }

    withContext = _withContext;
}

export class ForStatementNode implements ASTNode {
    type: string = 'ForStatement';
    init: ASTNode;
    test: ASTNode;
    update: ASTNode;
    body: ASTNode;
    extraContext?: Object;

    constructor(init: ASTNode, test: ASTNode, update: ASTNode, body: ASTNode) {
        this.init = init;
        this.test = test;
        this.update = update;
        this.body = body;
    }

    withContext = _withContext;
}

export class FunctionDeclarationNode implements ASTNode {
    type: string = 'FunctionDeclaration';
    name: string;
    returnType: any;
    params: any;
    body: any;
    extraContext?: Object;

    constructor(name: string, returnType, params, body) {
        this.name = name;
        this.returnType = returnType;
        this.params = params;
        this.body = body;
    }

    withContext = _withContext;
}

export class ExternDeclarationNode implements ASTNode {
    type: string = 'ExternDeclaration';
    name: string;
    valType: any;
    params: any;
    extraContext?: Object;

    constructor(name: string, valType, params) {
        this.name = name;
        this.valType = valType;
        this.params = params;
    }

    withContext = _withContext;
}

export class ReturnStatementNode implements ASTNode {
    type: string = 'ReturnStatement';
    argument?: ASTNode;
    extraContext?: Object;

    constructor(argument: ASTNode) {
        this.argument = argument;
    }

    withContext = _withContext;
}

export class MemberExpressionNode implements ASTNode {
    type: string = 'MemberExpression';
    computed?: any;
    object: any;
    property: any;
    extraContext?: Object;

    constructor(computed, object, property) {
        this.computed = computed;
        this.object = object;
        this.property = property;
    }

    withContext = _withContext;
}

export class CallExpressionNode implements ASTNode {
    type: string = 'CallExpression';
    callee: any;
    args: any;
    extraContext?: Object;

    constructor(callee, args) {
        this.callee = callee;
        this.args = args;
    }

    withContext = _withContext;
}

export class ClassDeclarationNode implements ASTNode {
    type: string = 'ClassDeclaration';
    id: any;
    superClass: any;
    body: any;
    extraContext?: Object;

    constructor(id, superClass, body) {
        this.id = id;
        this.superClass = superClass;
        this.body = body;
    }

    withContext = _withContext;
}

export class ThisExpressionNode implements ASTNode {
    type: string = 'ThisExpression';
    extraContext?: Object;

    withContext = _withContext;
}

export class SuperNode implements ASTNode {
    type: string = 'Super';
    extraContext?: Object;

    withContext = _withContext;
}

export class NewExpressionNode implements ASTNode {
    type: string = 'NewExpression';
    callee: any;
    args: any;
    extraContext?: Object;

    constructor(callee, args) {
        this.callee = callee;
        this.args = args;
    }

    withContext = _withContext;
}