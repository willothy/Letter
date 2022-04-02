module.exports = test => {
    // Simple variable declaration:
    test(`let x = 42;`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: {
                            type: 'NumericLiteral',
                            value: 42,
                        }
                    }
                ]
            }
        ]
    });

    // Var declare without init
    test(`let x;`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: null
                    }
                ]
            }
        ]
    });

    // Multiple var declares, no init
    test(`let x, y;`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: null
                    },
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'y',
                        },
                        init: null,
                    },
                ]
            }
        ]
    });

    // Multiple var declares, with init
    test(`let x, y = 42;`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: null,
                    },
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'y',
                        },
                        init: {
                            type: 'NumericLiteral',
                            value: 42,
                        },
                    },
                ]
            }
        ]
    });
}