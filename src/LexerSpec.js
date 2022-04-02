/** Tokenizer Spec
 * 
 */

const Spec = [
    // Whitespace:
    [/^\s+/, null],

    // Comments:
    //Single-Line comments:
    [/^\/\/.*/, null],

    // Multiline comments
    [/\/\*[\s\S]*?\*\//, null],

    // Symbols
    [/^;/, ';'],
    [/^\{/, '{'],
    [/^\}/, '}'],
    [/^\(/, '('],
    [/^\)/, ')'],
    [/^,/, ','],

    // Relational Operators
    [/^[><]=?/, 'RELATIONAL_OPERATOR'],

    // Equality Operators
    [/^[=!]=/, 'EQUALITY_OPERATOR'],

    // Logical operators: &&, ||
    [/^&&/, 'LOGICAL_AND'],
    [/^\|\|/, 'LOGICAL_OR'],

    // Assignment Operators
    [/^=/, 'SIMPLE_ASSIGN'],
    [/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],

    // Mathematical Operators: +, -, *, /
    [/^[+\-]/, 'ADDITIVE_OPERATOR'],
    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],

    // Keywords:
    [/^\blet\b/, 'let'],
    [/^\bif\b/, 'if'],
    [/^\belse\b/, 'else'],
    [/^\btrue\b/, 'true'],
    [/^\bfalse\b/, 'false'],
    [/^\bnull\b/, 'null'],

    // Numbers: 
    [/^\d+/, 'NUMBER'],

    // Identifiers
    [/^[a-zA-Z_][a-zA-Z_0-9]*/, 'IDENTIFIER'],

    // Strings:
    [/^"[^"]*"/, 'STRING'],
    [/^'[^']*'/, 'STRING']
];

module.exports = {Spec};