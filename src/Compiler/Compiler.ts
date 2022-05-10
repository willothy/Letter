import { 
    LLVMContext, 
    Module, 
    IRBuilder, 
    InitializeNativeTarget,
    InitializeNativeTargetDisassembler,
    InitializeNativeTargetAsmPrinter,
    InitializeAllTargetInfos,
    InitializeAllTargetMCs,
    TargetMachine
} from "llvm-bindings"

import Generators from './Generators';
import Utils from './Utils';

import LetterTypes from './Types';
import LetterFunction from './Function/Function';
import { ASTNode } from "../Parser/ASTNodes/ASTNode";


export default class Compiler {

    context: LLVMContext;
    module: Module;
    builder: IRBuilder;

    types: Object = LetterTypes;
    functions: Object = {};

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
    canTypeCast = Utils.canTypeCast;

    // Generators
    public Program = Generators.Program;
    public BlockStatement = Generators.BlockStatement;
    private ReturnStatement = Generators.ReturnStatement;
    private FunctionDeclaration = Generators.FunctionDeclaration;
    private ExpressionStatement = Generators.ExpressionStatement;
    private ExternDeclaration = Generators.ExternDeclaration;
    private VariableStatement = Generators.VariableStatement;
    private CallExpression = Generators.CallExpression;
    private AssignmentExpression = Generators.AssignmentExpression;
    private BinaryExpression = Generators.BinaryExpression;
    private Identifier = Generators.Identifier;
    private NumericLiteral = Generators.NumericLiteral;
    private CharLiteral = Generators.CharLiteral;
    private StringLiteral = Generators.StringLiteral;
    private LogicalExpression = Generators.LogicalExpression;
    private IfStatement = Generators.IfStatement;

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
        InitializeNativeTarget();
        InitializeNativeTargetAsmPrinter();
        InitializeNativeTargetDisassembler();

        InitializeAllTargetInfos();
        InitializeAllTargetMCs();

        this.codegen(ast, {}, undefined, ast);
        
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
    codegen(node: ASTNode, symbols:Object={}, fn:llvm.Function=undefined, parent: ASTNode) {
        switch (node.type) {
            case 'Program':
                this.Program(node, symbols, fn, parent);
                return;
            case 'BlockStatement':
                this.BlockStatement(node, symbols, fn, parent);
                return;
            case 'ReturnStatement':
                this.ReturnStatement(node, symbols, fn, parent);
                return;
            case 'FunctionDeclaration':
                this.FunctionDeclaration(node, symbols, parent);
                return;
            case 'ExpressionStatement':
                this.ExpressionStatement(node, symbols, fn, parent);
                return;
            case 'ExternDeclaration':
                this.ExternDeclaration(node, parent);
                return;
            case 'VariableStatement':
                this.VariableStatement(node, symbols, fn, parent);
                return;
            case 'CallExpression':
                return this.CallExpression(node, symbols, fn, parent);
            case 'AssignmentExpression':
                return this.AssignmentExpression(node, symbols, fn, parent);
            case 'BinaryExpression':
                return this.BinaryExpression(node, symbols, fn, parent);  
            case 'Identifier':
                return this.Identifier(node, symbols, fn, parent); 
            case 'NumericLiteral':
                return this.NumericLiteral(node, fn, parent);
            case 'CharLiteral':
                return this.CharLiteral(node, fn, parent);
            case 'StringLiteral':
                return this.StringLiteral(node, fn, parent);   
            case 'IfStatement':
                return this.IfStatement(node, symbols, fn, parent);
            case 'LogicalExpression':
                return this.LogicalExpression(node, symbols, fn, parent);          
            default:
                throw new Error("undefined instruction");
        }
    }    
}
