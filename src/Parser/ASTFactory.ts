
import ASTNode from './ASTNode';

export default class NodeFactory {
    /**
     * 
     * @param body
     * @returns 
     */
    static Program(body: ASTNode): ASTNode {
        return new ASTNode('Program', { body });
    }

    /**
     * 
     * @returns 
     */
    static EmptyStatement(): ASTNode {
        return new ASTNode('EmptyStatement');
    }

    /**
     * 
     * @param body 
     * @returns 
     */
    static BlockStatement(body: ASTNode): ASTNode {
        return new ASTNode('BlockStatement', { body });
    }

    /**
     * 
     * @param expression 
     * @returns 
     */
    static ExpressionStatement(expression: ASTNode): ASTNode {
        return new ASTNode('ExpressionStatement', { expression });
    }

    static Type(typeStr: string, arrayType: boolean, dimensions: number) {
        return new ASTNode('Type', {
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
    static StringLiteral(value: ASTNode): ASTNode {
        return new ASTNode('StringLiteral', { value });
    }
    
    /**
     * 
     * @param value 
     * @returns 
     */
    static CharLiteral(value): ASTNode {
        return new ASTNode('CharLiteral', { value });
    }

    /**
     * 
     * @param value 
     * @returns 
     */
    static NumericLiteral(value: ASTNode): ASTNode {
        return new ASTNode('NumericLiteral', value);
    }

    /**
     * 
     * @param operator 
     * @param left 
     * @param right 
     * @returns 
     */
    static BinaryExpression(operator: string, left: ASTNode, right: ASTNode): ASTNode {
        return new ASTNode(
            'BinaryExpression', {
                operator,
                left,
                right,
            }
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
        return new ASTNode(
            'AssignmentExpression', {
                operator,
                left,
                right,
            }
        );
    }

    /**
     * 
     * @param declarations 
     * @returns 
     */
    static VariableStatement(declarations: ASTNode[]): ASTNode {
        return new ASTNode('VariableStatement', { declarations });
    }

    /**
     * 
     * @param id 
     * @param type 
     * @param init 
     * @returns 
     */
    static VariableDeclaration(id, type, init): ASTNode {
        return new ASTNode(
            'VariableDeclaration', {
                id: id,
                valType: type,
                init
            }
        );
    }

    /**
     * 
     * @param name 
     * @returns 
     */
    static Identifier(name): ASTNode {
        return new ASTNode('Identifier', { name });
    }

    /**
     * 
     * @param test 
     * @param consequent 
     * @param alternate 
     * @returns 
     */
    static IfStatement(test, consequent, alternate): ASTNode {
        return new ASTNode(
            'IfStatement', {
                test,
                consequent,
                alternate
            }
        );
    }

    /**
     * 
     * @param value 
     * @returns 
     */
    static BooleanLiteral(value): ASTNode {
        return new ASTNode('BooleanLiteral', { value });
    }

    /**
     * 
     * @returns 
     */
    static NullLiteral(): ASTNode {
        return new ASTNode('NullLiteral', { value: null });
    }

    /**
     * 
     * @param operator 
     * @param left 
     * @param right 
     * @returns 
     */
    static LogicalExpression(operator, left, right): ASTNode {
        return new ASTNode(
            'LogicalExpression', {
                operator,
                left,
                right
            }
        );
    }
            
    /**
     * 
     * @param operator 
     * @param argument 
     * @returns 
     */
    static UnaryExpression(operator: string, argument: ASTNode): ASTNode {
        return new ASTNode('UnaryExpression', { operator, argument });
    }

    /**
     * 
     * @param test 
     * @param body 
     * @returns 
     */
    static WhileStatement(test, body): ASTNode {
        return new ASTNode('WhileStatement', {
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
    static DoWhileStatement(body, test): ASTNode {
        return new ASTNode(
            'DoWhileStatement', {
                body,
                test
            }
        );
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
        return new ASTNode(
            'ForStatement', {
                init,
                test,
                update,
                body
            }
        );
    }

    /**
     * 
     * @param name 
     * @param type 
     * @param params 
     * @param body 
     * @returns 
     */
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

    /**
     * 
     * @param name 
     * @param type 
     * @param params 
     * @returns 
     */
    static ExternDeclaration(name, type, params): ASTNode {
        return new ASTNode(
            'ExternDeclaration', {
                name,
                valType: type,
                params
            }
        );
    }

    /**
     * 
     * @param argument 
     * @returns 
     */
    static ReturnStatement(argument): ASTNode {
        return new ASTNode('ReturnStatement', { argument });
    }

    /**
     * 
     * @param computed 
     * @param object 
     * @param property 
     * @returns 
     */
    static MemberExpression(computed, object, property): ASTNode {
        return new ASTNode('MemberExpression', {
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
    static CallExpression(callee, args): ASTNode {
        return new ASTNode(
            'CallExpression', {
                callee,
                args
            }
        );
    }

    /**
     * 
     * @param id 
     * @param superClass 
     * @param body 
     * @returns 
     */
    static ClassDeclaration(id, superClass, body): ASTNode {
        return new ASTNode(
            'ClassDeclaration', {
                id,
                superClass,
                body
            }
        );
    }
    
    /**
     * 
     * @returns 
     */
    static ThisExpression(): ASTNode {
        return new ASTNode('ThisExpression');
    }

    /**
     * 
     * @returns 
     */
    static Super(): ASTNode {
        return new ASTNode('Super');
    }

    /**
     * 
     * @param callee 
     * @param args 
     * @returns 
     */
    static NewExpression(callee, args): ASTNode {
        return new ASTNode(
            'NewExpression', {
                callee,
                args
            }
        );
    }
};
