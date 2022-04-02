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
    init(string) {
        this._string = string;
        this._cursor = 0;
        this._lineno = 0;
        this._colno = 0;
    }

    /**
     * Determine whether there are more tokens in the string
     * @returns bool
     */
    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    /**
     * Determines whether tokenizer has reached end of file
     * @returns boolean
     */
    isEOF() {
        return this._cursor === this._string.length;
    }

    /**
     * Gets the next token
     */
    getNextToken() {    
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string.slice(this._cursor);
        // Recognize tokens

        for (const [regexp, tokenType] of Spec) {
            const tokenValue = this._match(regexp, string);
            if (tokenValue == null) continue;
            
            if (tokenType == null) {
                const newLine = /\n/.exec(string) != null;
                if (newLine == true) {
                    this._colno = 0;
                    this._lineno++;
                }
                return this.getNextToken();
            }

            return {
                type: tokenType,
                value: tokenValue,
                lineno: this._lineno,
                colno: this._colno
            };
        }

        throw new SyntaxError(`Unexpected token: "${string[0]} at line "${this._lineno}", col "${this._colno}"`);
    }

    _match(regexp, string) {
        let matched = regexp.exec(string);
        if (matched == null) return null;
        
        this._cursor += matched[0].length;
        this._colno += matched[0].length;
        return matched[0];
    }
}

module.exports = {
    Tokenizer
}