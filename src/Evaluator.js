
class RuntimeError extends Error {};

class Evaluator {
    /**
     * @constructor
     */
    constructor(debug) {
        this._ast = {};
        this._debug = debug;        
    }

    /**
     * Evaluates a given expression or program
     * @param {ASTNode} node 
     * @returns {void}
     */
    eval(node, local=new Map()) {
        if (this._debug) console.log(`Found ${node.type}`);

        // Entry point
        if (node.type === 'Program') {
            for (const statement of node.body) {
                this.eval(statement, local);
            }
            return 0;
        }

        if (node.type === 'BlockStatement') {
            for (let i = 0; i < node.body.length; i++) {
                this.eval(node.body[i], local);
            }
            return;
        }

        if (node.type === 'ExpressionStatement') {
            return this.eval(node.expression, local);
        }

        if (node.type === 'StringLiteral') {
            return String(node.value);
        }

        if (node.type === 'NumericLiteral') {
            return Number(node.value);
        }

        if (node.type === 'BooleanLiteral') {
            return Boolean(node.value);
        }

        if (node.type === 'NullLiteral') {
            return null;
        }

        if (node.type === 'BinaryExpression') {
            switch (node.operator) {
                case '+':
                    return (this.eval(node.left, local) + this.eval(node.right, local));
                case '-':
                    return (this.eval(node.left, local) - this.eval(node.right, local));
                case '*':
                    return (this.eval(node.left, local) * this.eval(node.right, local));
                case '/':
                    return (this.eval(node.left, local) / this.eval(node.right, local));
                case '==':
                    return (this.eval(node.left, local) == this.eval(node.right, local));
                case '!=':
                    return (this.eval(node.left, local) != this.eval(node.right, local));
                case '<=':
                    return (this.eval(node.left, local) <= this.eval(node.right, local));
                case '>=':
                    return (this.eval(node.left, local) >= this.eval(node.right, local));
                case '<':
                    return (this.eval(node.left, local) < this.eval(node.right, local));
                case '>':
                    return (this.eval(node.left, local) > this.eval(node.right, local));
                default: 
                    throw new RuntimeError("Unexpected operator " + node.operator);
            }
        }

        if (node.type === 'AssignmentExpression') {
            let value = undefined;
            if (node.left.type === 'Identifier') {
                if (!local.has(node.left.name)) throw new RuntimeError(`Variable ${node.left.name} does not exist. Declare it with the 'let' keyword before assigning to it.`);
                switch(node.operator) {
                    case '=':
                        value = this.eval(node.right, local);
                        local.set(node.left.name, value);
                        break;
                    case '+=':
                        value =  local.get(node.left.name) + this.eval(node.right, local);
                        local.set(node.left.name, value);
                        break;
                    case '-=':
                        value = local.get(node.left.name) - this.eval(node.right, local);
                        local.set(node.left.name, value);
                        break;
                    case '*=':
                        value = local.get(node.left.name) * this.eval(node.right, local);
                        local.set(node.left.name, value);
                        break;
                    case '/=':
                        value = local.get(node.left.name) / this.eval(node.right, local);
                        local.set(node.left.name, value);
                        break;
                }
                if (this._debug) console.log(`Assigned variable ${node.left.name} to ${value}`);
                return value;
            } else if (node.left.type === 'MemberExpression') {
                const member = this.eval(node.left, local);
                switch(node.operator) {
                    case '=':
                        return member[node.left.name] = this.eval(node.right, local);
                    case '+=':
                        return member[node.left.name] = member[node.left.name] + this.eval(node.right, local);
                    case '-=':
                        return member[node.left.name] = member[node.left.name] - this.eval(node.right, local);
                    case '*=':
                        return member[node.left.name] = member[node.left.name] * this.eval(node.right, local);
                    case '/=':
                        return member[node.left.name] = member[node.left.name] / this.eval(node.right, local);                      
                }
            }
        }

        if (node.type === 'VariableStatement') {
            let prev;
            for (const decl of node.declarations) {
                prev = this.eval(decl, local);
            }
        }

        if (node.type === 'VariableDeclaration') {
            if (node.init === null) {
                if (!local.has(node.id.name)) {
                    local.set(node.id.name, undefined);
                } else {
                    throw Error(`Name ${node.id.name} already exists`);
                }
                if (this._debug) console.log(`Declared ${node.id.name} without initializing.`);
            } else {
                const value = this.eval(node.init, local);
                local.set(node.id.name, value);
                if (this._debug) console.log(`Initialized ${node.id.name} as ${value}`);
            }
        }

        if (node.type === 'Identifier') {
            if (this._debug) console.log(`Found ident ${node.name} with value ${local.get(node.name)}`);
            return local.get(node.name);
        }

        if (node.type === 'IfStatement') {
            if (this.eval(node.test, local) == true) {
                this.eval(node.consequent, local);
            } else {
                this.eval(node.alternate, local);
            }
        }

        if (node.type === 'LogicalExpression') {
            if (node.operator == '&&') {
                return this.eval(node.left, local) == true && this.eval(node.right, local) == true;
            } else if (node.operator == '||') {
                return this.eval(node.left, local) == true || this.eval(node.right, local) == true;
            }
        }

        if (node.type === 'UnaryExpression') {
            if (node.operator === '!') {
                return !this.eval(node.argument, local);
            } else if (node.operator === '-') {
                return -(this.eval(node.argument, local));
            }
        }

        if (node.type === 'CallExpression') {
            let args = new Map();
            // TODO
            return this.eval(node.body, new Map([...local].concat(args)))
        }
    }
}

module.exports = {
    Evaluator
};