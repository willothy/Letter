
const exp = require('constants');
const {Tokenizer} = require('./Tokenizer');


// -------------------
// Default (JSON) AST factories
const DefaultFactory = {
    Program(body) {
        return {
            type: 'Program',
            body
        };
    },
    EmptyStatement(){
        return {
            type: 'EmptyStatement'
        };
    },
    BlockStatement(body) {
        return {
            type: 'BlockStatement',
            body
        };
    },
    ExpressionStatement(expression) {
        return {
            type: 'ExpressionStatement',
            expression
        };
    },
    StringLiteral(value) {
        return {
            type: 'StringLiteral',
            value
        };
    },
    NumericLiteral(value) {
        return {
            type: 'NumericLiteral',
            value
        };
    }
};

// ------------------
// S-Expression AST factories
const SExpressionFactory = {
    Program(body) {
        return ['begin', body];
    },
    EmptyStatement() {},
    BlockStatement(body) {
        return ['begin', body];
    },
    ExpressionStatement(expression) {
        return expression;
    },
    StringLiteral(value) {
        return `"${value}"`;
    },
    NumericLiteral(value) {
        return value;
    }
}

const AST_MODE = 'default';

const factory = AST_MODE === 'default' ? DefaultFactory : SExpressionFactory;

class Parser {
    /**
     * Initializes the parser
     * 
     */
    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    /**
     * Parses string into an AST
     * @param {*} string 
     * @returns ASTNode root
     */
    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        // Prime the tokenizer to obtain the first token
        // which is our lookahead. The lookahead is
        // used for predictive parsing.

        this._lookahead = this._tokenizer.getNextToken();

        // Parse recursively starting from the Program entry point

        return this.Program();
    }

    /**
     * Main entry point
     * 
     *  Program
     *      : StatementList
     *      ;
     */
    Program() {
        return factory.Program(this.StatementList())
    }

    /**
     *  StatementList
     *      : Statement
     *      | StatementList Statement -> Statement Statement Statement ...
     *      ;
     */
    StatementList(stopLookahead = null) {
        const statementList = [this.Statement()];

        while(this._lookahead != null && this._lookahead.type !== stopLookahead) {
            statementList.push(this.Statement());
        }

        return statementList;
    }


    /**
     *  Statement
     *      : ExpressionStatement
     *      | BlockStatement
     *      | EmptyStatement
     *      ;
     */
    Statement() {
        switch(this._lookahead.type) {
            case ';':
                return this.EmptyStatement();
            case '{': 
                return this.BlockStatement();
            default: 
                return this.ExpressionStatement();
        }
    }

    /**
     *  EmptyStatement
     *      : ';'
     *      ;
     */
    EmptyStatement() {
        this._eat(';');
        return factory.EmptyStatement();
    }

    /**
     *  BlockStatement
     *      : '{' OptStatementList '}'
     *      ;
     */
    BlockStatement() {
        this._eat('{');

        const body = this._lookahead.type !== '}' ? this.StatementList('}') : [];

        this._eat('}');

        return factory.BlockStatement(body)
    }

    /**
     *  ExpressionStatement
     *      : Expression ';'
     */
    ExpressionStatement() {
        const expression = this.Expression();
        this._eat(';');
        return factory.ExpressionStatement(expression);
    }

    /**
     *  Expression
     *      : Literal
     *      ;
     */
    Expression() {
        return this.Literal();
    }

    /**
     *  Literal
     *      : NumericLiteral
     *      | StringLiteral
     *      ;
     */
    Literal() {
        switch(this._lookahead.type) {
            case 'NUMBER': 
                return this.NumericLiteral();
            case 'STRING': 
                return this.StringLiteral();
        }
        throw new SyntaxError(`Literal: unexpected literal production "${this._lookahead.value | '<cannot read literal>'}"`);
    }

    /**
     *  StringLiteral
     *      : STRING
     *      ;
     */
    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1),
        };
    }

    /**
     *  NumericLiteral
     *      : NUMBER
     *      ;
     */
    NumericLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumericLiteral',
            value: Number(token.value),
        };
    }

    /**
     * Expects a token of a given type
     * @returns consumed token
     */
    _eat(tokenType) {
        const token = this._lookahead;

        if (token == null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: "${tokenType}"`
            );
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.value}", expected: "${tokenType}"`
            )
        }

        // Advance parser to next token
        this._lookahead = this._tokenizer.getNextToken();

        return token;
    }
}

module.exports = {
    Parser
}