# Letter

[![CodeQL](https://github.com/willothy/Letter/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/willothy/Letter/actions/workflows/codeql-analysis.yml)
[![DeepSource](https://deepsource.io/gh/willothy/Letter.svg/?label=active+issues&show_trend=true&token=s7FPYpp55Oo71OQtpE1BL1Hm)](https://deepsource.io/gh/willothy/Letter/?ref=repository-badge)
[![DeepSource](https://deepsource.io/gh/willothy/Letter.svg/?label=resolved+issues&show_trend=true&token=s7FPYpp55Oo71OQtpE1BL1Hm)](https://deepsource.io/gh/willothy/Letter/?ref=repository-badge)

Letter is a compiler project built in TypeScript using the [llvm-bindings](https://github.com/ApsarasX/llvm-bindings) module. The parser is based off of lectures by [Dmitry Soshnikov](https://github.com/DmitrySoshnikov/). Letter compiles to LLVM IR, which can then be compiled with Clang.

Letter is functional-only at the moment, though the parser supports objects and I plan on implementing them.

Since I'm working on integrating LLVM, only some of the below info is current.

Since Letter compiles using LLVM, it is compatible with C and C++. This hasn't been tested much, but there's an example of a Letter function being called from a C program in the `/example/c-link/` folder.

Letter requires an installation of LLVM 13. The [llvm-bindings](https://github.com/ApsarasX/llvm-bindings) readme has good installation instructions.

Features that are working now:

- Main function as entry point
- Preprocessor (import, define)
- Math operations
- Extern functions
- Function definitions (including void)
- Implicit typecasting of numbers
- Printing values using the print.lt library (printf wrapper)
- Strings, Floats, Doubles, and Integers

Known issues:

Here's an example of a working program in Letter: <br>

<br>
Use:<br>
The released version is outdated: I'll update this when there's a release with LLVM working fully. For now, it must be run from node.

Run the compiler using `npm run compile <filename>`. This will run letter and clang, prividing an executable.<br>
To build an object file, run `npm run object <filename>`.
The below flags don't work with this command - only with `npx ts-node ./letter.ts -f <filename> <flags>` which will generate llvm IR.
You then need to compile this IR using clang.
<br>

Current flags available:
Tested:

- `-s, --stack`: Prints the full JS stack on error. Normally, errors just print the message without stack trace when no debug flags are set.
- `-t, --tokens`: Prints a list of all tokens in the program, including from imported files.
- `-a, --ast`: Prints the full program's AST representation in JSON.
- `-i, --emit-ir`: Emits LLVM IR for compilation.

Untested with new versions:

- `-m, --minify`: Combines all code into one file, and turns it into one line.
  - Recommended use: `./bin/letter.rdp -f filename --minify > file.min.lt`

Sample programs and are included in the `/example/` folder.
