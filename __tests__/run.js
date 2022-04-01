

const {Parser} = require('../src/Parser');

const parser = new Parser();

const program = `
/*
    Multi-line comment
*/
// Single-line comment

// String
"hello";

// Number
42;
`;

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));