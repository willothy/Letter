"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tokenizer_1 = require("../Tokenizer/Tokenizer");
const fs_1 = require("fs");
const path_1 = require("path");
const PreprocessorError_1 = require("../Error/PreprocessorError");
/**
 * Preprocessor for Letter
 */
class Preprocessor {
    constructor() {
        this.tokenizer = new Tokenizer_1.default();
        this._basePath = '';
    }
    /**
     * External preprocessor interface
     * @param {*} mainFile
     * @param {*} basePath
     * @returns minified, preprocessed program.
     */
    exec(mainFile, basePath) {
        this._basePath = basePath;
        const prog = this.preprocess(mainFile);
        //console.log(prog.join(' '));
        return prog.join(' ');
        ;
    }
    /**
     * Gets the distance in the tokens iterable from the current position to the next valid (non-whitespace) token.
     * @param {Token[]} tokens
     * @param {Integer} current
     * @returns {Integer} distance to next valid token
     */
    getNextTokenDist(tokens, current) {
        let i = current + 1;
        while (tokens[i] === null)
            i++;
        return i;
    }
    /**
     * Gets lookahead token
     * @param {*} tokens
     * @param {*} index
     * @returns
     */
    getLookahead(tokens, index) {
        const lookahead = [];
        for (let i = index + 1; i < tokens.length && lookahead.length < 2; i++) {
            if (tokens[i].type !== null) {
                lookahead.push(tokens[i]);
            }
        }
        return lookahead;
    }
    /**
     * Resolves dependency path
     * @param {*} dep
     * @returns
     */
    getDependencyPath(dep) {
        const path = (0, path_1.join)(`${this._basePath}/`, dep.trim().substr(1, dep.length - 2) // remove " symbols and whitespace
        );
        if (!this.checkFileExist(path))
            throw new Error(`File ${dep} does not exist in ${this._basePath}`);
        return path;
    }
    checkFileExist(path) {
        try {
            (0, fs_1.accessSync)(path, fs_1.constants.R_OK);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Main preprocessor function
     * @param {*} mainFile
     * @param {*} _symbols
     * @returns
     */
    preprocess(mainFile, _symbols = null) {
        let program = [];
        const includes = [];
        const symbols = _symbols !== null && _symbols !== void 0 ? _symbols : Object.create(null);
        this.tokenizer.init(mainFile, null);
        const tokens = this.tokenizer.exec(false);
        for (let i = 0; i < tokens.length; i++) {
            const lookahead = [
                tokens[i + 1],
                tokens[i + 2]
            ];
            if (tokens[i].type === 'PRE_DEFINE') {
                if (lookahead[0].type === 'IDENTIFIER') {
                    symbols[lookahead[0].value] = lookahead[1] ? String(lookahead[1].value) : "";
                    i += 2;
                }
                else {
                    throw new PreprocessorError_1.default(`Unexpected token "${JSON.stringify(lookahead[0])}", 
                        next: "${JSON.stringify(lookahead[1])}"`);
                }
            }
            else if (tokens[i].type === 'PRE_INCLUDE') {
                if (lookahead[0].type === 'STRING') {
                    const src = (0, fs_1.readFileSync)(this.getDependencyPath(lookahead[0].value), 'utf-8');
                    includes.push(this.preprocess(src));
                    i += 1;
                }
                else {
                    throw new PreprocessorError_1.default(`Unexpected token "${JSON.stringify(lookahead[0])}", 
                        next: "${JSON.stringify(lookahead[1])}"`);
                }
            }
            else if (tokens[i].type === 'IDENTIFIER' && String(tokens[i].value) in symbols) {
                program.push(symbols[tokens[i].value]);
            }
            else {
                program.push(tokens[i].value);
            }
        }
        for (const include of includes) {
            program = [].concat(include, program);
        }
        return program;
    }
}
exports.default = Preprocessor;
