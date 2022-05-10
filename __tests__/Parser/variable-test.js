const Factory = require('../../build/src/Parser/ASTFactory').default;

module.exports = test => {
    // Simple variable declaration:
    test(
        `let int x = 42;`, 
        Factory.Program([
            Factory.VariableStatement([
                Factory.VariableDeclaration(
                    Factory.Identifier('x'),
                    Factory.Type('int', 'int', false, 0),
                    Factory.NumericLiteral('INTEGER', 42)
                )
            ])
        ]),
        'Variable Test 1'
    );

    // Var declare without init
    test(
        `let int x;`, 
        Factory.Program([
            Factory.VariableStatement([
                Factory.VariableDeclaration(
                    Factory.Identifier('x'),
                    Factory.Type('int', 'int', false, 0),
                    null
                )
            ])
        ]),
        'Variable Test 2'
    );

    // Multiple var declares, no init
    test(
        `let int x, float y;`, 
        Factory.Program([
            Factory.VariableStatement([
                Factory.VariableDeclaration(
                    Factory.Identifier('x'),
                    Factory.Type('int', 'int', false, 0),
                    null
                ),
                Factory.VariableDeclaration(
                    Factory.Identifier('y'),
                    Factory.Type('float', 'float', false, 0),
                    null
                )
            ])
        ]),
        'Variable Test 3'
    );

    // Multiple var declares, with init
    test(
        `let int x, int y = 42;`, 
        Factory.Program([
            Factory.VariableStatement([
                Factory.VariableDeclaration(
                    Factory.Identifier('x'),
                    Factory.Type('int', 'int', false, 0),
                    null
                ),
                Factory.VariableDeclaration(
                    Factory.Identifier('y'),
                    Factory.Type('int', 'int', false, 0),
                    Factory.NumericLiteral('INTEGER', 42)
                )
            ])
        ]),
        'Variable Test 4'
    );
}