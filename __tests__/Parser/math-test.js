const Factory = require('../../build/src/Parser/ASTFactory').default;

module.exports = test => {
    test(
        `2 + 2;`,
        Factory.Program([
            Factory.ExpressionStatement(
                Factory.BinaryExpression(
                    '+',
                    Factory.NumericLiteral('INTEGER', 2),
                    Factory.NumericLiteral('INTEGER', 2)
                )
            )
        ]),
        'Binary Operation Test 1'
    )

    test(
        `3 + 2 - 2;`,
        Factory.Program([
            Factory.ExpressionStatement(
                Factory.BinaryExpression(
                    '-',
                    Factory.BinaryExpression(
                        '+',
                        Factory.NumericLiteral('INTEGER', 3),
                        Factory.NumericLiteral('INTEGER', 2)
                    ),
                    Factory.NumericLiteral('INTEGER', 2)
                )
            )
        ]),
        'Binary Operation Test 2'
    );

    // Multiplication
    test(
        `2 * 2;`, 
        Factory.Program([
            Factory.ExpressionStatement(
                Factory.BinaryExpression(
                    '*',
                    Factory.NumericLiteral('INTEGER', 2),
                    Factory.NumericLiteral('INTEGER', 2)
                )
            )
        ]),
        'Binary Operation Test 3'
    );

    // Precedence of operations
    test(
        `2 + 2 * 2;`,
        Factory.Program([
            Factory.ExpressionStatement(
                Factory.BinaryExpression(
                    '+',
                    Factory.NumericLiteral('INTEGER', 2),
                    Factory.BinaryExpression(
                        '*',
                        Factory.NumericLiteral('INTEGER', 2),
                        Factory.NumericLiteral('INTEGER', 2)
                    )
                )
            )
        ]),
        'Binary Operation Test 4'   
    );

    test(
        `2 * 2 * 2;`, 
        Factory.Program([
            Factory.ExpressionStatement(
                Factory.BinaryExpression(
                    '*',
                    Factory.BinaryExpression(
                        '*',
                        Factory.NumericLiteral('INTEGER', 2),
                        Factory.NumericLiteral('INTEGER', 2)
                    ),
                    Factory.NumericLiteral('INTEGER', 2)
                )
            )
        ]),
        'Binary Operation Test 5'
    );

    // Parentheses for precedence:
    test(
        `(2 + 2) * 2;`, 
        Factory.Program([
            Factory.ExpressionStatement(
                Factory.BinaryExpression(
                    '*',
                    Factory.BinaryExpression(
                        '+',
                        Factory.NumericLiteral('INTEGER', 2),
                        Factory.NumericLiteral('INTEGER', 2)
                    ),
                    Factory.NumericLiteral('INTEGER', 2)
                )
            )
        ]),
        'Binary Operation Test 6'
    );
}
