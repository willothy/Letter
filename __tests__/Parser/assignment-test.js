const Factory = require('../../build/src/Parser/ASTFactory').default;

module.exports = test => {
    // Simple assignment
    test(
        `x = 42;`, 
        Factory.Program(
            [
                Factory.ExpressionStatement(
                    Factory.AssignmentExpression(
                        '=',
                        Factory.Identifier('x'),
                        Factory.NumericLiteral('INTEGER', 42)
                    )
                )
            ]
        ),
        "Assignment Test 1"
    );

    // Chained assignment
    test(
        `x = y = 42;`, 
        Factory.Program(
            [
                Factory.ExpressionStatement(
                    Factory.AssignmentExpression(
                        '=',
                        Factory.Identifier('x'),
                        Factory.AssignmentExpression(
                            "=",
                            Factory.Identifier('y'),
                            Factory.NumericLiteral('INTEGER', 42)
                        )
                    )
                )
            ]
        ),
        "Assignment Test 2"
    );
}

//Factory.NumericLiteral('INTEGER', 42)