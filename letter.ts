#!/usr/bin/env node

import Parser from "./src/Parser";
import Compiler from "./src/Compiler";

import { readFileSync } from "fs";
import { dirname, resolve, basename } from "path";

Error.stackTraceLimit = 0; // Don't print js stack trace when --stack isn't enabled

function main(argv) {
  const [_node, _path, mode, source, ...rest] = argv;

  let printStackTrace = false;
  let minify = false;
  let debugEval = false;
  if (rest.includes("-s") || rest.includes("--stack")) {
    printStackTrace = true;
    Error.stackTraceLimit = 100;
    // TODO: Implement evaluator stack trace
  }

  if (rest.includes("-m") || rest.includes("--minify")) minify = true;

  if (rest.includes("-d") || rest.includes("--debug")) debugEval = true;

  const parser = new Parser(minify);
  //const evaluator = new Evaluator();

  let ast = null;
  let moduleName = "";
  if (mode == "-e") {
    ast = parser.parse(source, null);
  } else if (mode == "-f") {
    const program = readFileSync(source, "utf-8");
    moduleName = basename(source, ".lt");
    ast = parser.parse(program, String(dirname(resolve(source))));
  }

  const compiler = new Compiler(moduleName);

  if (rest.includes("-t") || rest.includes("--tokens"))
    console.log(JSON.stringify(parser.tokenList, null, 2));

  if (rest.includes("-a") || rest.includes("--ast"))
    console.log(JSON.stringify(ast, null, 2));

  if (rest.includes("-i") || rest.includes("--emit-ir")) {
    const result = compiler.compile(ast); //evaluator.eval(ast);
    console.log(result);
  }

  //console.log(result == 0 ? "Program finished successfully with exit code 0." : `Program exited with code: ${result}`);
}

main(process.argv);
