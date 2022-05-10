const Factory = require('../../build/src/Parser/ASTFactory').default;

module.exports = test => {
    test(
        `"hello"; 42;`, 
        Factory.Program([
            Factory.ExpressionStatement(
                Factory.StringLiteral('hello')
            ),
            Factory.ExpressionStatement(
                Factory.NumericLiteral('INTEGER', 42)
            )
        ]),
        'Statement List Test'
    );
}