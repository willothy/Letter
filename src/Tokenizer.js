const {Spec} = require('./LexerSpec.js');

/**
 * Tokenizer class
 * Pulls a token from a stream
 */
class Tokenizer {
    /**
     * Initializes the string
     * @param {*} string 
     */
    init(string, tokenList) {
        this._program = string;
        this._cursor = 0;

        // Special variable, list of all tokens. Used for preprocessor and debug token printing
        // Passed by sharing from the parser, then returned
        this._tokenList = tokenList;
    }

    /**
     * Determine whether there are more tokens in the string
     * @returns bool
     */
    hasMoreTokens() {
        return this._cursor < this._program.length;
    }

    /**
     * Determines whether tokenizer has reached end of file
     * @returns boolean
     */
    isEOF() {
        return this._cursor === this._program.length;
    }

    /**
     * Consumes input and returns a list of all tokens
     * @returns {String[]} tokens
     */
    exec(nulls=false) {
        const tokens = [];
        while(this.hasMoreTokens()) {
            const tok = this.getNextToken(nulls);
            if (tok === null) return tokens;
            else tokens.push(tok);
        }
        return tokens;
    }

    /**
     * Gets the next token
     */
    getNextToken(nulls=false) {    
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._program.slice(this._cursor);
        // Recognize tokens

        for (const [regexp, tokenType] of Spec) {
            const tokenValue = this._match(regexp, string);
            if (tokenValue === null) continue;

            if (tokenType === null) {
                if (nulls == true) {
                    return {
                        type: tokenType,
                        value: tokenValue
                    };
                }
                return this.getNextToken();
            }
            // Push to token list
            if (this._tokenList !== null) {
                this._tokenList.push({
                    type: tokenType,
                    value: tokenValue
                });
            }
            return {
                type: tokenType,
                value: tokenValue
            };
        }

        throw new SyntaxError(`Unexpected token: "${string[0]}"`);
    }

    /**
     * 
     * @param {RegExp} regexp 
     * @param {String} string 
     * @returns {String} match or null
     */
    _match(regexp, string) {
        let matched = regexp.exec(string);
        if (matched === null) return null;
        this._cursor += matched[0].length; // Advance cursor
        return matched[0];
    }
}

module.exports = {
    Tokenizer
}
