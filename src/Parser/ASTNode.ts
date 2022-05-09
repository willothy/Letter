export default class ASTNode {
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

    withContext(context: Object = {}) {
        return new ASTNode(
            this.type, {
                body: this.body,
                expression: this.expression,
                statement: this.statement,
                value: this.value,
                left: this.left,
                right: this.right,
                operator: this.operator,
                declarations: this.declarations, 
                id: this.id,
                init: this.init,
                argument: this.argument,
                args: this.args,
                name: this.name,
                test: this.test,
                consequent: this.consequent,
                alternate: this.alternate,
                update: this.update,
                returnType: this.returnType,
                params: this.params,
                computed: this.computed,
                object: this.object,
                property: this.property,
                callee: this.callee,
                superClass: this.superClass,
                typeStr: this.typeStr,
                dimensions: this.dimensions,
                arrayType: this.arrayType,
                baseType: this.baseType,
                extraContext: {
                    ...this.extraContext,
                    ...context
                }
            }
        )
    }

    constructor(
        type: string, { 
            body,
            expression,
            statement,
            value,
            left,
            right,
            operator,
            declarations,
            id,
            valType,
            init,
            argument,
            args,
            name,
            test,
            consequent,
            alternate,
            update,
            returnType,
            params,
            computed,
            object,
            property,
            callee,
            superClass,
            typeStr,
            dimensions,
            arrayType,
            baseType,
            extraContext
        }: { 
            body?: any,
            expression?: ASTNode,
            statement?: ASTNode,
            value?: ASTNode,
            left?: ASTNode,
            right?: ASTNode,
            operator?: string,
            declarations?: ASTNode[],
            id?: ASTNode,
            valType?: any,
            init?: ASTNode,
            argument?: ASTNode,
            args?: any,
            name?: string,
            test?: ASTNode,
            consequent?: ASTNode,
            alternate?: ASTNode,
            update?: any,
            returnType?: any,
            params?: any,
            computed?: any,
            object?: any,
            property?: any,
            callee?: any,
            superClass?: any,
            typeStr?: string,
            dimensions?: number,
            arrayType?: boolean,
            baseType?: string,
            extraContext?: Object
        } = {}
    ) {
        this.type = type;
        this.body = body;
        this.expression = expression;
        this.statement = statement;
        this.value = value;
        this.left = left;
        this.right = right;
        this.operator = operator;
        this.declarations = declarations;
        this.id = id;
        this.valType = valType;
        this.init = init;
        this.argument = argument;
        this.args = args;
        this.name = name;
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
        this.update = update;
        this.returnType = returnType;
        this.params = params;
        this.computed = computed;
        this.object = object;
        this.property = property;
        this.callee = callee;
        this.superClass = superClass;
        this.typeStr = typeStr;
        this.dimensions = dimensions;
        this.arrayType = arrayType;
        this.baseType = baseType;
        this.extraContext = extraContext;
    }
}