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

    // Assignment Operators
    [/^=/, 'SIMPLE_ASSIGN'],
    [/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],

    // Mathematical Operators: +, -, *, /
    [/^[+\-]/, 'ADDITIVE_OPERATOR'],
    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],

    // Keywords:
    [/^\blet\b/, 'let'],
    

    // Numbers: 
    [/^\d+/, 'NUMBER'],

    // Identifiers
    [/^[a-zA-Z_][a-zA-Z_0-9]*/, 'IDENTIFIER'],

    // Strings:
    [/^"[^"]*"/, 'STRING'],
    [/^'[^']*'/, 'STRING']
];

module.exports = {Spec};