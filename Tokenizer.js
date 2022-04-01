
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
    }

    /**
     * Determine whether there are more tokens in the string
     * @returns bool
     */
    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    /**
     * Gets the next token
     */
    getNextToken() {    
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this.__string.slice(this._cursor);
        // Recognize tokens
        
        // Numbers:
        if (!Number.isNaN(string[0])) {
            let number = '';
            while (!Number.isNaN(Number(string[this._cursor]))) {
                number += string[this._cursor++]
            }
            return {
                type: 'NUMBER',
                value: number
            }
        }
    }
}

module.exports = {
    Tokenizer
}