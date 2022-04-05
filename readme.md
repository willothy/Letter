# Letter

Letter is an interpreter project built in JavaScript, based on lectures by Dmitry Soshnikov.

Currently only the parser is functional, but the interpreter is in progress.

From the root directory, run the parser using `./bin/letter.rdp -f filename` or `./bin/letter.rdp -f "statement"`.

Current flags available:
- `-s, --stack`: Prints the full JS stack on error. Normally, errors just print the message without stack trace when no debug flags are set.
- `-t, --tokens`: Prints a list of all tokens in the program, including from imported files.
- `-a, --ast`: Prints the full program's AST representation in JSON.
- `-m, --minify`: Combines all code into one file, and turns it into one line.
    - Recommended use: `./bin/letter.rdp -f filename --minify > file.min.lt`

Sample programs and syntax examples are included in the `/example/` folder.