
//import ASTNode from './ASTNode';
import {
    AssignmentExpressionNode,
    ASTNode,
    BinaryExpressionNode,
    BlockStatementNode,
    BooleanLiteralNode,
    CallExpressionNode,
    CharLiteralNode,
    ClassDeclarationNode,
    DoWhileStatementNode,
    EmptyStatementNode,
    ExpressionStatementNode,
    ExternDeclarationNode,
    ForStatementNode,
    FunctionDeclarationNode,
    IdentifierNode,
    IfStatementNode,
    LogicalExpressionNode,
    MemberExpressionNode,
    NewExpressionNode,
    NullLiteralNode,
    NumericLiteralNode,
    ProgramNode, 
    ReturnStatementNode, 
    StringLiteralNode, 
    SuperNode, 
    ThisExpressionNode, 
    TypeNode,
    UnaryExpressionNode,
    VariableDeclarationNode,
    VariableStatementNode,
    WhileStatementNode
} from './ASTNodes/ASTNode';


export default class NodeFactory {
    /**
     * 
     * @param body
     * @returns 
     */
    static Program(body: ASTNode[]): ASTNode {
        return new ProgramNode(body);
    }

    /**
     * 
     * @returns 
     */
    static EmptyStatement(): ASTNode {
        return new EmptyStatementNode();
    }

    /**
     * 
     * @param body 
     * @returns 
     */
    static BlockStatement(body: ASTNode[]): ASTNode {
        return new BlockStatementNode(body);
    }

    /**
     * 
     * @param expression 
     * @returns 
     */
    static ExpressionStatement(expression: ASTNode): ASTNode {
        return new ExpressionStatementNode(expression);
    }

    static Type(baseType: string, typeStr: string, arrayType: boolean, dimensions: number) {
        return new TypeNode(
            baseType,
            typeStr,
            arrayType,
            dimensions
        );
    }
    
    /**
     * 
     * @param value 
     * @returns 
     */
    static StringLiteral(value): ASTNode {
        return new StringLiteralNode(value);
    }
    
    /**
     * 
     * @param value 
     * @returns 
     */
    static CharLiteral(value): ASTNode {
        return new CharLiteralNode(value);
    }

    /**
     * 
     * @param value 
     * @returns 
     */
    static NumericLiteral(type, value): ASTNode {
        return new NumericLiteralNode(type, value);
    }

    /**
     * 
     * @param operator 
     * @param left 
     * @param right 
     * @returns 
     */
    static BinaryExpression(operator: string, left: ASTNode, right: ASTNode): ASTNode {
        return new BinaryExpressionNode(
            operator,
            left,
            right,    
        );
    }

    /**
     * 
     * @param operator 
     * @param left 
     * @param right 
     * @returns 
     */
    static AssignmentExpression(operator, left, right): ASTNode {
        return new AssignmentExpressionNode(
            operator,
            left,
            right,
        );
    }

    /**
     * 
     * @param declarations 
     * @returns 
     */
    static VariableStatement(declarations: ASTNode[]): ASTNode {
        return new VariableStatementNode(declarations);
    }

    /**
     * 
     * @param id 
     * @param type 
     * @param init 
     * @returns 
     */
    static VariableDeclaration(id, type, init): ASTNode {
        return new VariableDeclarationNode(id, type, init);
    }

    /**
     * 
     * @param name 
     * @returns 
     */
    static Identifier(name): ASTNode {
        return new IdentifierNode(name);
    }

    /**
     * 
     * @param test 
     * @param consequent 
     * @param alternate 
     * @returns 
     */
    static IfStatement(test, consequent, alternate): ASTNode {
        return new IfStatementNode(test, consequent, alternate);
    }

    /**
     * 
     * @param value 
     * @returns 
     */
    static BooleanLiteral(value): ASTNode {
        return new BooleanLiteralNode(value);
    }

    /**
     * 
     * @returns 
     */
    static NullLiteral(): ASTNode {
        return new NullLiteralNode();
    }

    /**
     * 
     * @param operator 
     * @param left 
     * @param right 
     * @returns 
     */
    static LogicalExpression(operator, left, right): ASTNode {
        return new LogicalExpressionNode(operator, left, right);
    }
            
    /**
     * 
     * @param operator 
     * @param argument 
     * @returns 
     */
    static UnaryExpression(operator: string, argument: ASTNode): ASTNode {
        return new UnaryExpressionNode(operator, argument);
    }

    /**
     * 
     * @param test 
     * @param body 
     * @returns 
     */
    static WhileStatement(test, body): ASTNode {
        return new WhileStatementNode(test, body);
    }

    /**
     * 
     * @param body 
     * @param test 
     * @returns 
     */
    static DoWhileStatement(body, test): ASTNode {
        return new DoWhileStatementNode(test, body);
    }

    /**
     * 
     * @param init 
     * @param test 
     * @param update 
     * @param body 
     * @returns 
     */
    static ForStatement(init, test, update, body): ASTNode {
        return new ForStatementNode(init, test, update, body);
    }

    /**
     * 
     * @param name 
     * @param returnType 
     * @param params 
     * @param body 
     * @returns 
     */
    static FunctionDeclaration(name, returnType, params, body): ASTNode {
        return new FunctionDeclarationNode(name, returnType, params, body);
    }

    /**
     * 
     * @param name 
     * @param returnType 
     * @param params 
     * @returns 
     */
    static ExternDeclaration(name, returnType, params): ASTNode {
        return new ExternDeclarationNode(name, returnType, params);
    }

    /**
     * 
     * @param argument 
     * @returns 
     */
    static ReturnStatement(argument): ASTNode {
        return new ReturnStatementNode(argument);
    }

    /**
     * 
     * @param computed 
     * @param object 
     * @param property 
     * @returns 
     */
    static MemberExpression(computed, object, property): ASTNode {
        return new MemberExpressionNode(computed, object, property);
    }

    /**
     * 
     * @param callee 
     * @param args 
     * @returns 
     */
    static CallExpression(callee, args): ASTNode {
        return new CallExpressionNode(callee, args);
    }

    /**
     * 
     * @param id 
     * @param superClass 
     * @param body 
     * @returns 
     */
    static ClassDeclaration(id, superClass, body): ASTNode {
        return new ClassDeclarationNode(id, superClass, body);
    }
    
    /**
     * 
     * @returns 
     */
    static ThisExpression(): ASTNode {
        return new ThisExpressionNode();
    }

    /**
     * 
     * @returns 
     */
    static Super(): ASTNode {
        return new SuperNode();
    }

    /**
     * 
     * @param callee 
     * @param args 
     * @returns 
     */
    static NewExpression(callee, args): ASTNode {
        return new NewExpressionNode(callee, args);
    }
};
