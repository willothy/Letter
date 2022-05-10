"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASTNode_1 = require("./ASTNode");
class NodeFactory {
    /**
     *
     * @param body
     * @returns
     */
    static Program(body) {
        return new ASTNode_1.default('Program', { body });
    }
    /**
     *
     * @returns
     */
    static EmptyStatement() {
        return new ASTNode_1.default('EmptyStatement');
    }
    /**
     *
     * @param body
     * @returns
     */
    static BlockStatement(body) {
        return new ASTNode_1.default('BlockStatement', { body });
    }
    /**
     *
     * @param expression
     * @returns
     */
    static ExpressionStatement(expression) {
        return new ASTNode_1.default('ExpressionStatement', { expression });
    }
    static Type(baseType, typeStr, arrayType, dimensions) {
        return new ASTNode_1.default('Type', {
            baseType,
            typeStr,
            dimensions,
            arrayType
        });
    }
    /**
     *
     * @param value
     * @returns
     */
    static StringLiteral(value) {
        return new ASTNode_1.default('StringLiteral', { value });
    }
    /**
     *
     * @param value
     * @returns
     */
    static CharLiteral(value) {
        return new ASTNode_1.default('CharLiteral', { value });
    }
    /**
     *
     * @param value
     * @returns
     */
    static NumericLiteral(type, value) {
        return new ASTNode_1.default('NumericLiteral', { valType: type, value });
    }
    /**
     *
     * @param operator
     * @param left
     * @param right
     * @returns
     */
    static BinaryExpression(operator, left, right) {
        return new ASTNode_1.default('BinaryExpression', {
            operator,
            left,
            right,
        });
    }
    /**
     *
     * @param operator
     * @param left
     * @param right
     * @returns
     */
    static AssignmentExpression(operator, left, right) {
        return new ASTNode_1.default('AssignmentExpression', {
            operator,
            left,
            right,
        });
    }
    /**
     *
     * @param declarations
     * @returns
     */
    static VariableStatement(declarations) {
        return new ASTNode_1.default('VariableStatement', { declarations });
    }
    /**
     *
     * @param id
     * @param type
     * @param init
     * @returns
     */
    static VariableDeclaration(id, type, init) {
        return new ASTNode_1.default('VariableDeclaration', {
            id: id,
            valType: type,
            init
        });
    }
    /**
     *
     * @param name
     * @returns
     */
    static Identifier(name) {
        return new ASTNode_1.default('Identifier', { name });
    }
    /**
     *
     * @param test
     * @param consequent
     * @param alternate
     * @returns
     */
    static IfStatement(test, consequent, alternate) {
        return new ASTNode_1.default('IfStatement', {
            test,
            consequent,
            alternate
        });
    }
    /**
     *
     * @param value
     * @returns
     */
    static BooleanLiteral(value) {
        return new ASTNode_1.default('BooleanLiteral', { value });
    }
    /**
     *
     * @returns
     */
    static NullLiteral() {
        return new ASTNode_1.default('NullLiteral', { value: null });
    }
    /**
     *
     * @param operator
     * @param left
     * @param right
     * @returns
     */
    static LogicalExpression(operator, left, right) {
        return new ASTNode_1.default('LogicalExpression', {
            operator,
            left,
            right
        });
    }
    /**
     *
     * @param operator
     * @param argument
     * @returns
     */
    static UnaryExpression(operator, argument) {
        return new ASTNode_1.default('UnaryExpression', { operator, argument });
    }
    /**
     *
     * @param test
     * @param body
     * @returns
     */
    static WhileStatement(test, body) {
        return new ASTNode_1.default('WhileStatement', {
            test,
            body
        });
    }
    /**
     *
     * @param body
     * @param test
     * @returns
     */
    static DoWhileStatement(body, test) {
        return new ASTNode_1.default('DoWhileStatement', {
            body,
            test
        });
    }
    /**
     *
     * @param init
     * @param test
     * @param update
     * @param body
     * @returns
     */
    static ForStatement(init, test, update, body) {
        return new ASTNode_1.default('ForStatement', {
            init,
            test,
            update,
            body
        });
    }
    /**
     *
     * @param name
     * @param type
     * @param params
     * @param body
     * @returns
     */
    static FunctionDeclaration(name, type, params, body) {
        return new ASTNode_1.default('FunctionDeclaration', {
            name,
            returnType: type,
            params,
            body
        });
    }
    /**
     *
     * @param name
     * @param type
     * @param params
     * @returns
     */
    static ExternDeclaration(name, type, params) {
        return new ASTNode_1.default('ExternDeclaration', {
            name,
            valType: type,
            params
        });
    }
    /**
     *
     * @param argument
     * @returns
     */
    static ReturnStatement(argument) {
        return new ASTNode_1.default('ReturnStatement', { argument });
    }
    /**
     *
     * @param computed
     * @param object
     * @param property
     * @returns
     */
    static MemberExpression(computed, object, property) {
        return new ASTNode_1.default('MemberExpression', {
            computed,
            object,
            property
        });
    }
    /**
     *
     * @param callee
     * @param args
     * @returns
     */
    static CallExpression(callee, args) {
        return new ASTNode_1.default('CallExpression', {
            callee,
            args
        });
    }
    /**
     *
     * @param id
     * @param superClass
     * @param body
     * @returns
     */
    static ClassDeclaration(id, superClass, body) {
        return new ASTNode_1.default('ClassDeclaration', {
            id,
            superClass,
            body
        });
    }
    /**
     *
     * @returns
     */
    static ThisExpression() {
        return new ASTNode_1.default('ThisExpression');
    }
    /**
     *
     * @returns
     */
    static Super() {
        return new ASTNode_1.default('Super');
    }
    /**
     *
     * @param callee
     * @param args
     * @returns
     */
    static NewExpression(callee, args) {
        return new ASTNode_1.default('NewExpression', {
            callee,
            args
        });
    }
}
exports.default = NodeFactory;
;
