"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ASTNode {
    constructor(type, { body, expression, statement, value, left, right, operator, declarations, id, valType, init, argument, args, name, test, consequent, alternate, update, returnType, params, computed, object, property, callee, superClass, typeStr, dimensions, arrayType, baseType, extraContext } = {}) {
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
    print() {
        console.log(`Node ${this.type}:\n`);
        if (this.body)
            console.log('\t' + this.body);
        if (this.expression)
            console.log('\t' + this.expression);
        if (this.statement)
            console.log('\t' + this.statement);
        if (this.value)
            console.log('\t' + this.value);
        if (this.left)
            console.log('\t' + this.left);
        if (this.right)
            console.log('\t' + this.right);
        if (this.operator)
            console.log('\t' + this.operator);
        if (this.declarations)
            console.log('\t' + this.declarations);
        if (this.id)
            console.log('\t' + this.id);
        if (this.valType)
            console.log('\t' + this.valType);
        if (this.init)
            console.log('\t' + this.init);
        if (this.argument)
            console.log('\t' + this.argument);
        if (this.args)
            console.log('\t' + this.args);
        if (this.name)
            console.log('\t' + this.name);
        if (this.test)
            console.log('\t' + this.test);
        if (this.consequent)
            console.log('\t' + this.consequent);
        if (this.alternate)
            console.log('\t' + this.alternate);
        if (this.update)
            console.log('\t' + this.update);
        if (this.returnType)
            console.log('\t' + this.returnType);
        if (this.params)
            console.log('\t' + this.params);
        if (this.computed)
            console.log('\t' + this.computed);
        if (this.object)
            console.log('\t' + this.object);
        if (this.property)
            console.log('\t' + this.property);
        if (this.callee)
            console.log('\t' + this.callee);
        if (this.superClass)
            console.log('\t' + this.superClass);
        if (this.typeStr)
            console.log('\t' + this.typeStr);
        if (this.dimensions)
            console.log('\t' + this.dimensions);
        if (this.arrayType)
            console.log('\t' + this.arrayType);
        if (this.baseType)
            console.log('\t' + this.baseType);
        if (this.extraContext)
            console.log('\t' + this.extraContext);
    }
    withContext(context = {}) {
        return new ASTNode(this.type, {
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
            extraContext: Object.assign(Object.assign({}, this.extraContext), context)
        });
    }
}
exports.default = ASTNode;
