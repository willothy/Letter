
import ASTNode from './ASTNode';

export default class NodeFactory {
    static Program(body: ASTNode): ASTNode {
        return new ASTNode('Program', { body });
    }

    static EmptyStatement(): ASTNode {
        return new ASTNode('EmptyStatement');
    }

    static BlockStatement(body: ASTNode): ASTNode {
        return new ASTNode('BlockStatement', { body });
    }

    static ExpressionStatement(expression: ASTNode): ASTNode {
        return new ASTNode('ExpressionStatement', { expression });
    }
    
    static StringLiteral(value: ASTNode): ASTNode {
        return new ASTNode('StringLiteral', { value });
    }
    
    static CharLiteral(value): ASTNode {
        return new ASTNode('CharLiteral', { value });
    }

    static NumericLiteral(value: ASTNode): ASTNode {
        return new ASTNode('NumericLiteral', value);
    }

    static BinaryExpression(operator: string, left: ASTNode, right: ASTNode): ASTNode {
        return new ASTNode(
            'BinaryExpression', {
                operator,
                left,
                right,
            }
        );
    }

    static AssignmentExpression(operator, left, right): ASTNode {
        return new ASTNode(
            'AssignmentExpression', {
                operator,
                left,
                right,
            }
        );
    }

    static VariableStatement(declarations: ASTNode[]): ASTNode {
        return new ASTNode('VariableStatement', { declarations });
    }

    static VariableDeclaration(id, type, init): ASTNode {
        return new ASTNode(
            'VariableDeclaration', {
                id: id,
                valType: type,
                init
            }
        );
    }

    static Identifier(name): ASTNode {
        return new ASTNode('Identifier', { name });
    }

    static IfStatement(test, consequent, alternate): ASTNode {
        return new ASTNode(
            'IfStatement', {
                test,
                consequent,
                alternate
            }
        );
    }

    static BooleanLiteral(value): ASTNode {
        return new ASTNode('BooleanLiteral', { value });
    }

    static NullLiteral(): ASTNode {
        return new ASTNode('NullLiteral', { value: null });
    }

    static LogicalExpression(operator, left, right): ASTNode {
        return new ASTNode(
            'LogicalExpression', {
                operator,
                left,
                right
            }
        );
    }
            
    static UnaryExpression(operator: string, argument: ASTNode): ASTNode {
        return new ASTNode('UnaryExpression', { operator, argument });
    }

    static WhileStatement(test, body): ASTNode {
        return new ASTNode('WhileStatement', {
            test,
            body
        });
    }

    static DoWhileStatement(body, test): ASTNode {
        return new ASTNode(
            'DoWhileStatement', {
                body,
                test
            }
        );
    }

    static ForStatement(init, test, update, body): ASTNode {
        return new ASTNode(
            'ForStatement', {
                init,
                test,
                update,
                body
            }
        );
    }

    static FunctionDeclaration(name, type, params, body): ASTNode {
        return new ASTNode(
            'FunctionDeclaration', {
                name,
                returnType: type,
                params,
                body
            }
        );
    }

    static ExternDeclaration(name, type, params): ASTNode {
        return new ASTNode(
            'ExternDeclaration', {
                name,
                valType: type,
                params
            }
        );
    }

    static ReturnStatement(argument): ASTNode {
        return new ASTNode('ReturnStatement', { argument });
    }

    static MemberExpression(computed, object, property): ASTNode {
        return new ASTNode('MemberExpression', {
            computed, 
            object,
            property
        });
    }

    static CallExpression(callee, args): ASTNode {
        return new ASTNode(
            'CallExpression', {
                callee,
                args
            }
        );
    }

    static ClassDeclaration(id, superClass, body): ASTNode {
        return new ASTNode(
            'ClassDeclaration', {
                id,
                superClass,
                body
            }
        );
    }
    
    static ThisExpression(): ASTNode {
        return new ASTNode('ThisExpression');
    }

    static Super(): ASTNode {
        return new ASTNode('Super');
    }

    static NewExpression(callee, args): ASTNode {
        return new ASTNode(
            'NewExpression', {
                callee,
                args
            }
        );
    }
};
