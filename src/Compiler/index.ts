import { 
    Function,
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
    private Program = Generators.Program;
    private BlockStatement = Generators.BlockStatement;
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

    codegen(node, symbols:Object={}, fn:llvm.Function=undefined) {
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
