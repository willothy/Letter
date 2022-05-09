"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
const Generators_1 = require("./Generators");
const Utils_1 = require("./Utils");
const Types_1 = require("./Types");
class Compiler {
    constructor(moduleName) {
        // Types
        // Utils
        this.unbackslash = Utils_1.default.unbackslash;
        this.getKeyByValue = Utils_1.default.getKeyByValue;
        this.resolveArrayParam = Utils_1.default.resolveArrayParam;
        this.resolveFuncType = Utils_1.default.resolveFuncType;
        this.isFloat = Utils_1.default.isFloat;
        this.isInteger = Utils_1.default.isInteger;
        this.checkType = Utils_1.default.checkType;
        this.handleNumericTypecasts = Utils_1.default.handleNumericTypecasts;
        this.convertType = Utils_1.default.convertType;
        this.convertValue = Utils_1.default.convertValue;
        // Generators
        this.Program = Generators_1.default.Program;
        this.BlockStatement = Generators_1.default.BlockStatement;
        this.ReturnStatement = Generators_1.default.ReturnStatement;
        this.FunctionDeclaration = Generators_1.default.FunctionDeclaration;
        this.ExpressionStatement = Generators_1.default.ExpressionStatement;
        this.ExternDeclaration = Generators_1.default.ExternDeclaration;
        this.VariableStatement = Generators_1.default.VariableStatement;
        this.CallExpression = Generators_1.default.CallExpression;
        this.AssignmentExpression = Generators_1.default.AssignmentExpression;
        this.BinaryExpression = Generators_1.default.BinaryExpression;
        this.Identifier = Generators_1.default.Identifier;
        this.NumericLiteral = Generators_1.default.NumericLiteral;
        this.CharLiteral = Generators_1.default.CharLiteral;
        this.StringLiteral = Generators_1.default.StringLiteral;
        this.context = new llvm_bindings_1.LLVMContext();
        this.module = new llvm_bindings_1.Module(moduleName, this.context);
        this.builder = new llvm_bindings_1.IRBuilder(this.context);
    }
    /**
     * External interface for driver
     * @param {AST} ast
     * @returns LLVM IR as text
     */
    compile(ast) {
        this.codegen(ast);
        return this.module.print();
    }
    /**
     * Codegen switch statement wrapper
     * @param node
     * @param symbols
     * @param fn
     * @returns
     */
    /* types:Object={...BuiltinTypes},*/
    codegen(node, symbols = {}, types = Object.assign({}, Types_1.default), fn = undefined) {
        switch (node.type) {
            case 'Program':
                this.Program(node, symbols, types, fn);
                return;
            case 'BlockStatement':
                this.BlockStatement(node, symbols, types, fn);
                return;
            case 'ReturnStatement':
                this.ReturnStatement(node, symbols, types, fn);
                return;
            case 'FunctionDeclaration':
                this.FunctionDeclaration(node, symbols, types);
                return;
            case 'ExpressionStatement':
                this.ExpressionStatement(node, symbols, types, fn);
                return;
            case 'ExternDeclaration':
                this.ExternDeclaration(node, types);
                return;
            case 'VariableStatement':
                this.VariableStatement(node, symbols, types, fn);
                return;
            case 'CallExpression':
                return this.CallExpression(node, symbols, types, fn);
            case 'AssignmentExpression':
                return this.AssignmentExpression(node, symbols, types, fn);
            case 'BinaryExpression':
                return this.BinaryExpression(node, symbols, types, fn);
            case 'Identifier':
                return this.Identifier(node, symbols, types);
            case 'NumericLiteral':
                return this.NumericLiteral(node);
            case 'CharLiteral':
                return this.CharLiteral(node);
            case 'StringLiteral':
                return this.StringLiteral(node);
            default:
                throw new Error("undefined instruction");
        }
    }
}
exports.default = Compiler;
