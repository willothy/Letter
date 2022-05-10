

const assert = require('assert').strict;
const Parser = require('../build/src/Parser/Parser').default;
const Factory = require('../build/src/Parser/ASTFactory').default;
/**
 * List of tests
 */
const parserTests = [
    require('./Parser/literals-test.js'),
    require('./Parser/statement-list-test.js'),
    require('./Parser/block-test.js'),
    require('./Parser/empty-statement-test.js'),
    require('./Parser/math-test.js'),
    require('./Parser/assignment-test.js'),
    require('./Parser/variable-test.js'),
    /*require('./Parser/if-test.js'),
    require('./Parser/relational-test.js'),
    require('./Parser/equality-test.js'),
    require('./Parser/logical-test.js'),
    require('./Parser/unary-test.js'),
    require('./Parser/while-test.js'),
    require('./Parser/do-while-test.js'),
    require('./Parser/function-declaration-test.js'),
    require('./Parser/member-test.js'),
    require('./Parser/call-test.js'),
    require('./Parser/class-test.js'),
    require('./Parser/combined-test.js')*/
]

const parser = new Parser();

function exec() {
    const program = `
        proc double circumference(double radius) {
            return 2 * pi * radius;
        }
        
        proc double circumference(float radius) {
            return 2 * pi * radius;
        }
        
        proc float circumference(float radius) return 2 * pi * radius;
        
        
        proc int main() {
            let float f = circumference(10.0);
            let double d = circumference(10.0);
            let double q = circumference(f);
        
            printFloat(f);
        
            return 0;
        }
    `;
    
    const ast = parser.parse(`x = 42;`);
    
    console.log(JSON.stringify(ast, null, 2));

    const exp = Factory.Program(
        [Factory.AssignmentExpression(
            '=',
            Factory.Identifier('x'),
            Factory.NumericLiteral('INTEGER', 42)
        )]
    );
    console.log(JSON.stringify(exp, null, 2));
}

function setupTests() {

}

function test(program, expected, name) {
    const ast = parser.parse(program);
    console.log(`Running ${name}`);
    assert.deepEqual(ast, expected);
    console.log('Passed.');
}

function testParser() {
    parserTests.forEach(runTest => runTest(test));
    console.log('All parser assertions passed!');
}

function testCompiler() {
    compilerTests.forEach(runTest => runTest(test));
    console.log('All compiler assertions passed!');
}

const testArgs = process.argv.slice(2);

if (testArgs.includes("manual")) exec();
if (testArgs.includes("parser")) testParser();
if (testArgs.includes("compiler")) testCompiler();
if (testArgs.includes("setup")) setupTests();

