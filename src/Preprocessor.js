const { Tokenizer } = require("./Tokenizer");

const { readFileSync } = require('fs');
const { join, resolve } = require('path');

class PreprocessorError extends Error {}

class Preprocessor {
    constructor() {
        this.tokenizer = new Tokenizer();
        this._basePath = '';
    }

    exec(mainFile, basePath) {
        this._basePath = basePath;
        const prog = this.preprocess(mainFile);
        //console.log(prog.join(' '));
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

    getLookahead (tokens, index) {
        const lookahead = [];
        for (let i = index+1; i < tokens.length && lookahead.length < 2; i++) {
            if (tokens[i].type != null) {
                lookahead.push(tokens[i]);
            }
        }
        return lookahead;
    }

    // Resolves path 
    getDependencyPath (dep) {
        return join(
            this._basePath + '/', 
            dep.trim().substr(1, dep.length-1) // remove @ symbol and whitespace
        );
    }

    preprocess(mainFile, _symbols=null) {
        let program = [];
        let includes = [];
        let symbols = _symbols ?? Object.create(null);

        this.tokenizer.init(mainFile, null);
        let tokens = this.tokenizer.exec(false);

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
                    let src = readFileSync(this.getDependencyPath(lookahead[0].value), 'utf-8'); 
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
