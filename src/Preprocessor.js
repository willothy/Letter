const { Tokenizer } = require("./Tokenizer");

const fs = require('fs');

class PreprocessorError extends Error {}

class Preprocessor {
    constructor() {
        
    }

    exec(mainFile) {
        const prog = this.preprocess(mainFile);
        
        return prog.join(' ');;
    }

    /**
     * Gets the distance in the tokens iterable from the current position to the next valid (non-whitespace) token.
     * @param {Token[]} tokens 
     * @param {Integer} current 
     * @returns {Integer} distance to next valid token
     */
    getNextTokenDist (tokens, current) {
        let i = current+1;
        while(tokens[i] == null) i++;
        return i;
    }

    genLookahead (tokens, index) {
        const lookahead = [];
        for (let i = index+1; i < tokens.length && lookahead.length < 2; i++) {
            if (tokens[i].type != null) {
                lookahead.push(tokens[i]);
            }
        }
        return lookahead;
    }

    preprocess(mainFile, _symbols=null) {
        const tokenizer = new Tokenizer();
        let program = [];
        let includes = [];
        let symbols = _symbols ?? Object.create(null);

        tokenizer.init(mainFile, null);
        let tokens = tokenizer.exec(false);

        for (var i = 0; i < tokens.length; i++) {
            let lookahead = [
                tokens[i+1],
                tokens[i+2]
            ];
            
            if (tokens[i].type === 'PRE_DEFINE') {
                if (lookahead[0].type === 'IDENTIFIER') {
                    symbols[lookahead[0].value] = String(lookahead[1].value);
                    i+=2;
                } else {
                    throw new PreprocessorError(`Unexpected token "${JSON.stringify(lookahead[0])}", 
                        next: "${JSON.stringify(lookahead[1])}"`);
                }            
            } else if (tokens[i].type === 'PRE_INCLUDE') {
                if (lookahead[0].type === 'FILENAME') {
                    /* .replace(/^"(.*)"$|^'(.*)'$/, '$1$2')*/
                    let src = fs.readFileSync(lookahead[0].value.substr(1, lookahead[0].value.length-2), 'utf-8');
                    includes.push(this.preprocess(src, symbols));
                    i+=1;
                } else {
                    throw new PreprocessorError(`Unexpected token "${JSON.stringify(lookahead[0])}", 
                        next: "${JSON.stringify(lookahead[1])}"`);
                }
            } else if (tokens[i].type == 'IDENTIFIER' && String(tokens[i].value) in symbols) {
                program.push(symbols[tokens[i].value]);
            } else {
                program.push(tokens[i].value);
            }
        }

        for (const include of includes) {
            program = [].concat(include, program);
        }
        
        return program;
    }
}


module.exports = {
    Preprocessor
};