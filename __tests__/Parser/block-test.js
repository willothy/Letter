const Factory = require('../../build/src/Parser/ASTFactory').default;

module.exports = test => {
    test(
        `{
            42;
            {
                "hello";
            }
        }`,
        Factory.Program([
            Factory.BlockStatement([
                Factory.ExpressionStatement(
                    Factory.NumericLiteral('INTEGER', 42)
                ),
                Factory.BlockStatement([
                    Factory.ExpressionStatement(
                        Factory.StringLiteral('hello')
                    )
                ])
            ])
        ]),
        "Block Test"
    );
}