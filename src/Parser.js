
const {Tokenizer} = require('./Tokenizer');

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

        return this.Program();
    }

    /**
     * Main entry point
     * 
     *  Program
     *      : NumericLiteral
     *      ;
     */
    Program() {
        return {
            type: 'Program',
            body: this.NumericLiteral()
        };
    }

    /**
     *  NumericLiteral
     *      : NUMBER
     */
    NumericLiteral() {
        return {
            type: 'NumericLiteral',
            value: Number(this._string),
        };
    }
}

module.exports = {
    Parser
}