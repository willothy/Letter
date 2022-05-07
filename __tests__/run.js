const assert = require("assert").strict;
const { Parser } = require("../src/Parser");

/**
 * List of tests
 */
const tests = [
  require("./literals-test.js"),
  require("./statement-list-test.js"),
  require("./block-test.js"),
  require("./empty-statement-test.js"),
  require("./math-test.js"),
  require("./assignment-test.js"),
  require("./variable-test.js"),
  require("./if-test.js"),
  require("./relational-test.js"),
  require("./equality-test.js"),
  require("./logical-test.js"),
  require("./unary-test.js"),
  require("./while-test.js"),
  require("./do-while-test.js"),
  require("./function-declaration-test.js"),
  require("./member-test.js"),
  require("./call-test.js"),
  require("./class-test.js"),
  require("./combined-test.js"),
];

const parser = new Parser();

function exec() {
  const program = `
        class Point {
            proc constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        
            proc calc() return this.x + this.y;
        }
        
        class Point3D extends Point {
            proc constructor (x, y, z) {
                super(x, y);
                this.z = z;
            }
            proc constructor (point2d, z) {
                this.x = point2d.x;
                this.y = point2d.y;
                this.z = z;
            }
        
            proc calc() return super() + this.z;
        }
        
        // This is a comment
        
        /*
            This is also a comment
        */
        
        let x, y = 20;
        x = 10;
        
        let p = new Point(x, y);
        
        let p3d = new Point3D(p.x, p['y'], 10);
        
        let p3d2 = new Point3D(p, 0);
        
        p.calc();
    `;

  const ast = parser.parse(program);

  console.log(JSON.stringify(ast, null, 2));
}

function test(program, expected) {
  const ast = parser.parse(program);
  assert.deepEqual(ast, expected);
}
function autoTest() {
  tests.forEach((testRun) => testRun(test));
  console.log("All assertions passed!");
}

const testArgs = process.argv.slice(2);

if (testArgs.includes("manual")) exec();
if (testArgs.includes("auto")) autoTest();
