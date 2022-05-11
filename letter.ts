#!/usr/bin/env node

import Parser from './src/Parser/Parser';
import Compiler from './src/Compiler/Compiler';

import { readFileSync, writeFile } from "fs";
import { dirname, resolve, basename } from 'path';

import * as llvm from 'llvm-bindings';

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
    
    const parser = new Parser(minify);
    //const evaluator = new Evaluator();

    let ast = null;
    let moduleName = '';
    if (mode == '-e') {
        ast = parser.parse(source, null);
    } else if (mode == '-f') {
        const program = readFileSync(source, 'utf-8');
        moduleName = basename(source, '.lt');
        ast = parser.parse(program, String(dirname(resolve(source))));
    }

    const compiler = new Compiler(moduleName);

    if (rest.includes('-t') || rest.includes('--tokens')) 
        console.log(JSON.stringify(parser.tokenList, null, 2));

    if (rest.includes('-a') || rest.includes('--ast')) 
        console.log(JSON.stringify(ast, null, 2));

    if (rest.includes('-i') || rest.includes('--emit-ir')) {
        const result = compiler.compile(ast);//evaluator.eval(ast);
        writeFile(`${moduleName}.ll`, result, (err) => {
            if (err) console.error(`ERROR: Could not write file ${moduleName}.ll.`);
        });
    }
    
    //console.log(result == 0 ? "Program finished successfully with exit code 0." : `Program exited with code: ${result}`);
}

main(process.argv);
