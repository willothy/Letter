/** Tokenizer Spec
 * 
 */

const Spec = [
    // Whitespace:
    [/^\s+/, null],
    [/^\n+/, null],

    // Comments:
    //Single-Line comments:
    [/^\/\/.*/, null],

    // Multiline comments
    [/^\/\*[\s\S]*?\*\//, null],
    
    

    // Symbols
    [/^;/, ';'],
    [/^\{/, '{'],
    [/^\}/, '}'],
    [/^\(/, '('],
    [/^\)/, ')'],
    [/^,/, ','],
    [/^\./, '.'],
    [/^\[/, '['],
    [/^\]/, ']'],

    // Relational Operators
    [/^[><]=?/, 'RELATIONAL_OPERATOR'],

    // Equality Operators
    [/^[=!]=/, 'EQUALITY_OPERATOR'],

    // Logical operators: &&, ||
    [/^&&/, 'LOGICAL_AND'],
    [/^\|\|/, 'LOGICAL_OR'],
    [/^!/, 'LOGICAL_NOT'],

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
    [/^\bwhile\b/, 'while'],
    [/^\bdo\b/, 'do'],
    [/^\bfor\b/, 'for'],
    [/^\bproc\b/, 'proc'],
    [/^\breturn\b/, 'return'],
    [/^\bnew\b/, 'new'],
    [/^\bclass\b/, 'class'],
    [/^\bextends\b/, 'extends'],
    [/^\bsuper\b/, 'super'],
    [/^\bthis\b/, 'this'],

    // Preprocessor symbols:
    [/^#dependency/, 'PRE_INCLUDE'],
    [/^#define/, 'PRE_DEFINE'],

    // Filename
    [/\@[^\@\n]+/, 'FILENAME'],

    // Numbers: 
    [/^(?![\.]?$)(?=\.?\d+)[\d]*\.?[\d]*(?:[e][\d]+)?(?=\W*)/, 'NUMBER'],

    // Identifiers
    [/^[a-zA-Z_][\w]*/, 'IDENTIFIER'],
    
    // Strings:
    [/^"[^"]*"/, 'STRING'],
    [/^'[^']*'/, 'STRING'],

    // Multiline string
    [/^`[^`]*`/m, 'STRING']
];

module.exports = {Spec};
