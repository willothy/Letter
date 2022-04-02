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

    // Mathematical Operators: +, -, *, /
    [/^[+\-]/, 'ADDITIVE_OPERATOR'],
    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],

    // Numbers: 
    [/^\d+/, 'NUMBER'],

    // Strings:
    [/^"[^"]*"/, 'STRING'],
    [/^'[^']*'/, 'STRING']
];

module.exports = {Spec};