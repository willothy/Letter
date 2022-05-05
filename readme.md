# Letter
[![CodeQL](https://github.com/willothy/Letter/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/willothy/Letter/actions/workflows/codeql-analysis.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=willothy_Letter&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=willothy_Letter)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=willothy_Letter&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=willothy_Letter)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=willothy_Letter&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=willothy_Letter)

Note: I'm in the process of a rework of Letter to allow for compilation with llvm using the llvm-bindings module.

Letter is an interpreter project built in JavaScript, based on lectures by Dmitry Soshnikov.
Currently the evaluator only features simple arithmetic and variables, but more is coming soon.
<br>
Use:<br>
Letter can be run with one of the binaries provided on the [releases](https://github.com/willothy/Letter/releases/) page.
Run the interpreter using `./letter -f ./filename.lt` or `./bin/letter.rdp -f "statement"`.<br>
Alternatively, letter can be run directly from nodejs using `./letter-rdp` with the same syntax as above.<br>

To build Letter from source, use `pkg`.
`npm install -g pkg`
`pkg ./letter-rdp -o letter`

<br>

Current flags available:
- `-s, --stack`: Prints the full JS stack on error. Normally, errors just print the message without stack trace when no debug flags are set.
- `-t, --tokens`: Prints a list of all tokens in the program, including from imported files.
- `-a, --ast`: Prints the full program's AST representation in JSON.
- `-d, --debug`: Prints each node type and operation as it's completed by the evaluator.
- `-m, --minify`: Combines all code into one file, and turns it into one line.
    - Recommended use: `./bin/letter.rdp -f filename --minify > file.min.lt`

Sample programs and are included in the `/example/` folder. Among these is the `working.lt` file, which will be updated for every feature that is pushed to show the current state of the language.<br>

## Syntax reference:
<br>

### Statement Terminator:
As in many languages, Letter requires a semicolon after each statement. Note that this does *not* apply to braces enclosing code blocks
<br><br>

For example, `let x = 0;` requires a semicolon and will throw a syntax error without it, but if statements, loops, functions and classes do not require a postfix semicolon. The one exception is the `do while` loop, which does require a semicolon after the closing parentheses of the condition.
<br><br>

### Comments:
Comments in Letter are identical to JavaScript.

    // This is a one-line comment

    /* This is a multi
        -line comment */

### Primitive Types:
Letter currently suppports strings, booleans, integer and floating point numbers, and a null value. <br>

Numbers can be represented using both standard and scientific notation, such as `3e2` or `1.987e4`. Note that Letter does not yet have support for the unary minus in the exponent in scientific notation.

### Variable Declaration & Assignment:  
Letter is weeakly typed, so variables of any type can be declared using
    
    let x = 0.0;
    // or 
    let x = "hello, world!";
    // or
    let x = new Square();
    // etc.

Variables can be declared without being assigned. 

    let x;
    // ... 
    x = 10;

### Function Declarations:
Functions can be declared with the `proc` keyword, followed by the function name, arguments in parentheses, and *either* a code block or a single statement. <br>
For example, a function to square a number could be defined as 

    proc square (num) {
        return num * num;
    }

    // or

    proc square (num) return num * num;

This concept extends to loops and if statements.
### Class Declarations
Classes are declared nearly identically to JavaScript in Letter. Classes can include an optional constructor as shown. A letter class declaration looks like this:

    class Rectangle {
        proc constructor(width, height) {
            this.width = width;
            this.height = height;
            this.area = this.calcArea();
        }

        proc calcArea() return this.width * this.height;
    }

    class Square extends Rectangle {
        proc constructor(size) {
            super(size, size);
            this.area = this.calcArea();
        }
    }


### The Preprocessor
<br>Letter has a preprocessor which acts similarly to that of C and C++. You can import files to Letter using the `#dependency` keyword, followed by `@` and the relative or absolute path to the file.<br><br>
Example: `#dependency @./area.lt` as shown in `/example/example.lt` imports the contents of `area.lt` from the current folder.<br>

Note that the preprocessor does not **yet** check if a file has been imported twice, so if two different libraries depend on a single separate library, it is required to import the dependency in the main file, before the dependent libraries, instead of importing it within each library. <br><br>
The Letter preprocessor also allows you to define constants. For example, the statement `#define pi 3.1415926` replaces every instance of the identifer `pi` with the numeric literal `3.1415926`. I am planning on extending this in the future to support more complex value replacements such as macro-ized functions.

Preprocessor statements should not include postfix semicolons. Preprocessor statements which include semicolons may have undefined behavior.
