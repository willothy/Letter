

class Evaluator {
    /**
     * @constructor
     */
    constructor() {
        this._ast = {};
    }

    /**
     * Evaluates a given expression or program
     * @param {ASTNode} node 
     * @returns {void}
     */
    eval(node) {
        if (node.type === 'Program') {
            this.eval(node.body);
            return;
        }

        if (node.type === 'BlockStatement') {
            for (let i = 0; i < node.body.length; i++) {
                this.eval(node.body[i]);
            }
            return;
        }

        if (node.type === 'ExpressionStatement') {
            return this.eval(node.expression);
        }

        if (node.type === 'StringLiteral') {
            return String(node.value);
        }

        if (node.type === 'NumericLiteral') {
            return Number(node.value);
        }

        if (node.type === 'BinaryExpression') {
            switch (node.operator) {
                case '+':
                    return this.eval(node.left) + this.eval(node.right);
                case '+':
                    return this.eval(node.left) + this.eval(node.right);
                case '+':
                    return this.eval(node.left) + this.eval(node.right);
                case '+':
                    return this.eval(node.left) + this.eval(node.right);
                default: 
                    throw new RuntimeError("Unexpected operator " + node.operator);
            }
        }

        if (node.type === 'AssignmentExpression') {
            // TODO
        }

        if (node.type === 'VariableStatement') {
            // TODO
        }

        if (node.type === 'VariableDeclaration') {
            // TODO
        }

        if (node.type === 'Identifier') {
            // TODO
        }

        if (node.type === 'IfStatement') {
            if (this.eval(node.test) == true) {
                this.eval(node.consequent);
            } else {
                this.eval(node.alternate);
            }
        }
        
        if (node.type === 'BooleanLiteral') {
            return Boolean(node.value);
        }

        if (node.type === 'NullLiteral') {
            return null;
        }

        if (node.type === 'LogicalExpression') {
            if (node.operator == '&&') {
                return this.eval(node.left) == true && this.eval(node.right) == true;
            } else if (node.operator == '||') {
                return this.eval(node.left) == true || this.eval(node.right) == true;
            }
        }

        if (node.type === 'UnaryExpression') {
            if (node.operator === '!') {
                return !this.eval(node.argument);
            } else if (node.operator === '-') {
                
            }
        }
    }
}