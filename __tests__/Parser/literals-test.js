const Factory = require('../../build/src/Parser/ASTFactory').default;

module.exports = test => {
    // NumericLiteral
    test(
        `42;`, 
        Factory.Program(
            [
                Factory.ExpressionStatement(
                    Factory.NumericLiteral('INTEGER', 42)
                )
            ]
        ),
        "Literals Test 1"
    );

    test(
        `42.0;`, 
        Factory.Program(
            [
                Factory.ExpressionStatement(
                    Factory.NumericLiteral('FLOAT', 42.0)
                )
            ]
        ),
        "Literals Test 2"
    );

    // StringLiteral
    test(
        `"hello";`,
        Factory.Program(
            [
                Factory.ExpressionStatement(
                    Factory.StringLiteral('hello')
                )
            ]
        ),
        "Literals Test 3" 
    );
};  