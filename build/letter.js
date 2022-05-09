#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./src/Parser/Parser");
const Compiler_1 = require("./src/Compiler/Compiler");
const fs_1 = require("fs");
const path_1 = require("path");
Error.stackTraceLimit = 5; // Don't print full js stack trace when --stack isn't enabled
function main(argv) {
    const [mode, source, ...rest] = argv.slice(2, argv.length);
    let minify = false;
    if (rest.includes('-s') || rest.includes('--stack')) {
        Error.stackTraceLimit = 100;
        // TODO: Implement evaluator stack trace
    }
    if (rest.includes('-m') || rest.includes('--minify'))
        minify = true;
    const parser = new Parser_1.default(minify);
    //const evaluator = new Evaluator();
    let ast = null;
    let moduleName = '';
    if (mode == '-e') {
        ast = parser.parse(source, null);
    }
    else if (mode == '-f') {
        const program = (0, fs_1.readFileSync)(source, 'utf-8');
        moduleName = (0, path_1.basename)(source, '.lt');
        ast = parser.parse(program, String((0, path_1.dirname)((0, path_1.resolve)(source))));
    }
    const compiler = new Compiler_1.default(moduleName);
    if (rest.includes('-t') || rest.includes('--tokens'))
        console.log(JSON.stringify(parser.tokenList, null, 2));
    if (rest.includes('-a') || rest.includes('--ast'))
        console.log(JSON.stringify(ast, null, 2));
    if (rest.includes('-i') || rest.includes('--emit-ir')) {
        const result = compiler.compile(ast); //evaluator.eval(ast);
        console.log(result);
    }
    //console.log(result == 0 ? "Program finished successfully with exit code 0." : `Program exited with code: ${result}`);
}
main(process.argv);
