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
  [/^;/, ";"],
  [/^\{/, "{"],
  [/^\}/, "}"],
  [/^\(/, "("],
  [/^\)/, ")"],
  [/^,/, ","],
  [/^\./, "."],
  [/^\[/, "["],
  [/^\]/, "]"],

  // Relational Operators
  [/^[><]=?/, "RELATIONAL_OPERATOR"],

  // Equality Operators
  [/^[=!]=/, "EQUALITY_OPERATOR"],

  // Logical operators: &&, ||
  [/^&&/, "LOGICAL_AND"],
  [/^\|\|/, "LOGICAL_OR"],
  [/^!/, "LOGICAL_NOT"],

  // Assignment Operators
  [/^=/, "SIMPLE_ASSIGN"],
  [/^[\*\/\+\-]=/, "COMPLEX_ASSIGN"],

  // Mathematical Operators: +, -, *, /
  [/^[+\-]/, "ADDITIVE_OPERATOR"],
  [/^[*\/]/, "MULTIPLICATIVE_OPERATOR"],

  // Primitive Types:
  [/^\bint\b/, "TYPE"],
  [/^\bfloat\b/, "TYPE"],
  [/^\bdouble\b/, "TYPE"],
  [/^\bchar\b/, "TYPE"],
  [/^\bbool\b/, "TYPE"],
  [/^\bstring\b/, "TYPE"],

  // Constant value keywords
  [/^\btrue\b/, "true"],
  [/^\bfalse\b/, "false"],
  [/^\bnull\b/, "null"],
  [/^\bvoid\b/, "void"],

  // Keywords:
  [/^\blet\b/, "let"],
  [/^\bif\b/, "if"],
  [/^\belse\b/, "else"],
  [/^\bwhile\b/, "while"],
  [/^\bdo\b/, "do"],
  [/^\bfor\b/, "for"],
  [/^\bproc\b/, "proc"],
  [/^\breturn\b/, "return"],
  [/^\bnew\b/, "new"],
  [/^\bclass\b/, "class"],
  [/^\bextends\b/, "extends"],
  [/^\bsuper\b/, "super"],
  [/^\bthis\b/, "this"],

  [/^\bextern\b/, "extern"],

  // Preprocessor symbols:
  [/^#dependency/, "PRE_INCLUDE"],
  [/^#define/, "PRE_DEFINE"],

  // Filename
  [/\@[^\@\n]+/, "FILENAME"],

  // Numbers:
  //[/^(?![\.]?$)(?=\.?\d+)[\d]*\.?[\d]*(?:[e][\d]+)?(?=\W*)/, 'NUMBER'],
  [/^[+-]?([0-9]+[.][0-9]*|[.][0-9]+)/, "FLOAT"],
  [/^[+-]?([0-9]+)/, "INTEGER"],

  // Identifiers
  [/^[a-zA-Z_][a-zA-Z_0-9]*/, "IDENTIFIER"],

  // Strings:
  [/^"[^"]*"/, "STRING"],
  [/^'[^']'/, "CHAR"],

  // Multiline string
  [/^`[^`]*`/m, "STRING"],
];

export default Spec;
