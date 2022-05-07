import { 
    ConstantInt,
    ConstantFP, 
    PointerType,
    ArrayType, 
    APInt,
    Function,
    Type,
    FunctionType,
    BasicBlock,
    LLVMContext, 
    Module, 
    IRBuilder 
} from "llvm-bindings"

import Generators from './Generators/';
import Utils from './Utils/';

export default class Compiler {

    context: LLVMContext;
    module: Module;
    builder: IRBuilder;

    // Utils
    unbackslash = Utils.unbackslash;
    getKeyByValue = Utils.getKeyByValue;
    resolveArrayParam = Utils.resolveArrayParam;
    resolveFuncType = Utils.resolveFuncType;
    isFloat = Utils.isFloat;
    isInteger = Utils.isInteger;
    checkType = Utils.checkType;
    handleNumericTypecasts = Utils.handleNumericTypecasts;
    convertType = Utils.convertType;
    convertValue = Utils.convertValue;

    // Generators
    Program = Generators.Program;
    BlockStatement = Generators.BlockStatement;
    ReturnStatement = Generators.ReturnStatement;
    FunctionDeclaration = Generators.FunctionDeclaration;
    ExpressionStatement = Generators.ExpressionStatement;
    ExternDeclaration = Generators.ExternDeclaration;
    VariableStatement = Generators.VariableStatement;
    CallExpression = Generators.CallExpression;
    AssignmentExpression = Generators.AssignmentExpression;
    BinaryExpression = Generators.BinaryExpression;
    Identifier = Generators.Identifier;
    NumericLiteral = Generators.NumericLiteral;
    CharLiteral = Generators.CharLiteral;
    StringLiteral = Generators.StringLiteral;

    constructor(moduleName) {
        this.context = new LLVMContext();
        this.module = new Module(moduleName, this.context);
        this.builder = new IRBuilder(this.context);
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

    codegen(node, symbols:{}={}, fn:Function=undefined) {
        switch (node.type) {
            case 'Program':
                this.Program(node, symbols, fn);
                return;
            case 'BlockStatement':
                this.BlockStatement(node, symbols, fn);
                return;
            case 'ReturnStatement':
                this.ReturnStatement(node, symbols, fn);
                return;
            case 'FunctionDeclaration':
                this.FunctionDeclaration(node, symbols);
                return;
            case 'ExpressionStatement':
                this.ExpressionStatement(node, symbols, fn);
                return;
            case 'ExternDeclaration':
                this.ExternDeclaration(node);
                return;
            case 'VariableStatement':
                this.VariableStatement(node, symbols, fn);
                return;
            case 'CallExpression':
                return this.CallExpression(node, symbols, fn);
            case 'AssignmentExpression':
                return this.AssignmentExpression(node, symbols, fn);
            case 'BinaryExpression':
                return this.BinaryExpression(node, symbols, fn);  
            case 'Identifier':
                return this.Identifier(node, symbols); 
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
