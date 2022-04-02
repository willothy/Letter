

const assert = require('assert').strict;
const {Parser} = require('../src/Parser');

/**
 * List of tests
 */
const tests = [
    require('./literals-test.js'),
    require('./statement-list-test.js'),
    require('./block-test.js'),
    require('./empty-statement-test.js'),
    require('./math-test.js'),
    require('./assignment-test.js'),
    require('./variable-test.js'),
    require('./if-test.js'),
    require('./relational-test.js'),
    require('./equality-test.js'),
    require('./logical-test.js'),
    require('./unary-test.js'),
    require('./while-test.js'),
    require('./do-while-test.js')
]

const parser = new Parser();

function exec() {
    const program = `
        if (x) x = 1; else if (y) y = 1;
    `;
    
    const ast = parser.parse(program);
    
    console.log(JSON.stringify(ast, null, 2));
}

function test(program, expected) {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expected);
}
function autoTest() {
    tests.forEach(testRun => testRun(test));
    console.log('All assertions passed!');
}

const testArgs = process.argv.slice(2);

if (testArgs.includes("manual")) exec();
if (testArgs.includes("auto")) autoTest();

