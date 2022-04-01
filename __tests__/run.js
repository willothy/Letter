

const assert = require('assert').strict;
const {Parser} = require('../src/Parser');

/**
 * List of tests
 */
const tests = [
    require('./literals-test.js'),
    require('./statement-list-test.js'),
    require('./block-test.js')
]

const parser = new Parser();

function exec() {
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
}

// Manual test:
//exec();

function test(program, expected) {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expected);
}

tests.forEach(testRun => testRun(test));
console.log('All assertions passed!');