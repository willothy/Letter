# Letter
[![CodeQL](https://github.com/willothy/Letter/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/willothy/Letter/actions/workflows/codeql-analysis.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=willothy_Letter&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=willothy_Letter)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=willothy_Letter&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=willothy_Letter)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=willothy_Letter&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=willothy_Letter)

Letter is a compiler project built in JavaScript/NodeJS using the [llvm-bindings](https://github.com/ApsarasX/llvm-bindings) module. Letter compiles to LLVM IR, which can then be compiled with Clang.

Letter is functional-only at the moment, though the parser supports objects and I plan on implementing them.

Since I'm working on integrating LLVM, only some of the below info is current. 
Features that are working now: 
- Main function as entry point
- Preprocessor (import, define)
- Floats, Doubles, Integers
- Math operations
- Extern functions
- Function definitions (without returns so far)
- Implicit typecasting of numbers
- String, Float, Double, and Integer literals

Here's an example of a working program in Letter: <br>
Math library:

    // math.lt

    #define pi 3.1415926

Print library:
    
    // print.lt

    extern int printf(char* str); // link printf from C std libs

    proc int printInt(int v) {
        printf("%d\n", v);
    }

    proc double printDouble(double v) {
        printf("%f\n", v);
    }
Main program file:

    // main.lt

    #dependency @./print.lt
    #dependency @./math.lt

    proc int main() {
        let int radius = 2;
        let float circumference = 2.0 * pi * radius;
        let double c = circumference;
        printDouble(c);
    }

<br>
Use:<br>
The released version is outdated: I'll update this when there's a release with LLVM working fully.

Run the compiler using `./letter -f ./filename.lt` or `./bin/letter.rdp -f "statement"`.<br>
Alternatively, letter can be run directly from nodejs using `./letter-rdp` with the same syntax as above.<br>
<br>

Current flags available:
Tested:
- `-s, --stack`: Prints the full JS stack on error. Normally, errors just print the message without stack trace when no debug flags are set.
- `-t, --tokens`: Prints a list of all tokens in the program, including from imported files.
- `-a, --ast`: Prints the full program's AST representation in JSON.

Untested with new versions:
- `-d, --debug`: Prints each node type and operation as it's completed by the evaluator.
- `-m, --minify`: Combines all code into one file, and turns it into one line.
    - Recommended use: `./bin/letter.rdp -f filename --minify > file.min.lt`

Sample programs and are included in the `/example/` folder. Among these is the `working.lt` file, which will be updated for every feature that is pushed to show the current state of the language.<br>

## Syntax reference:
<br>

### Statement Terminator:
As in many languages, Letter requires a semicolon after each statement. Note that this does *not* apply to braces enclosing code blocks
<br><br>

For example, `let int x = 0;` requires a semicolon and will throw a syntax error without it, but if statements, loops, functions and classes do not require a postfix semicolon. The one exception is the `do while` loop, which does require a semicolon after the closing parentheses of the condition.
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
    
    let float x = 0.0;
    // or 
    let string x = "hello, world!";
    // or
    let Square x = new Square();
    // etc.

Variables can be declared without being assigned. 

    let int x;
    // ... 
    x = 10;

### Function Declarations:
Functions can be declared with the `proc` keyword, followed by the function name, arguments in parentheses, and *either* a code block or a single statement. <br>
For example, a function to square a number could be defined as 

    proc int square (int num) {
        return num * num;
    }

    // or

    proc int square (int num) return num * num;

This concept extends to loops and if statements.
### Class Declarations
NOTE: This hasn't been updated for LLVM letter. Subject to change, and not working right now.
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
