module.exports = test => {
    test(`
    
        foo(x);
    
    `, {
        // Expected AST goes here
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo'
                    },
                    arguments: [
                        {
                            type: 'Identifier',
                            name: 'x'
                        }
                    ]
                }
            }
        ]
    });

    test(`
    
        foo(x)();
    
    `, {
        // Expected AST goes here
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'foo'
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 'x'
                            }
                        ]
                    },
                    arguments: []
                }
            }
        ]
    });
};