# Letter

Letter is an interpreter project built in JavaScript, based on lectures by Dmitry Soshnikov.

**Currently only the parser is functional, but the interpreter is in progress.**
<br><br>
Use:<br>
Run the parser using `./bin/letter.rdp -f ./filename.lt` or `./bin/letter.rdp -f "statement"`.

<br>

Current flags available:
- `-s, --stack`: Prints the full JS stack on error. Normally, errors just print the message without stack trace when no debug flags are set.
- `-t, --tokens`: Prints a list of all tokens in the program, including from imported files.
- `-a, --ast`: Prints the full program's AST representation in JSON.
- `-m, --minify`: Combines all code into one file, and turns it into one line.
    - Recommended use: `./bin/letter.rdp -f filename --minify > file.min.lt`

Sample programs and are included in the `/example/` folder.<br>

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