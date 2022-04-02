module.exports = test => {
    test(`
    
        class Point {
            proc constructor (x, y) {
                this.x = x;
                this.y = y;
            }

            proc calc() {
                return this.x + this.y;
            }
        }
    
    `, {
        // Expected AST goes here
        type: 'Program',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Point'
                },
                superClass: null,
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'FunctionDeclaration',
                            name: {
                                type: 'Identifier',
                                name: 'constructor'
                            },
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                {
                                    type: 'Identifier',
                                    name: 'y'
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'ThisExpression'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                }
                                            },
                                            operator: '=',
                                            right: {
                                                type: 'Identifier',
                                                name: 'x'
                                            }
                                        }
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'ThisExpression'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'y'
                                                }
                                            },
                                            operator: '=',
                                            right: {
                                                type: 'Identifier',
                                                name: 'y'
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            type: 'FunctionDeclaration',
                            name: {
                                type: 'Identifier',
                                name: 'calc'
                            },
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'ThisExpression'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                }
                                            },
                                            operator: '+',
                                            right: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'ThisExpression'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'y'
                                                },
                                            },
                                        },
                                    },                                
                                ]
                            }
                        },
                    ],
                },
            },
        ],
    });

    test(`
    
        class Point3D extends Point {
            proc constructor (x, y, z) {
                super(x, y);
                this.z = z;
            }

            proc calc() return super() + this.z;
        }
    
    `, {
        // Expected AST goes here
        type: 'Program',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Point3D'
                },
                superClass: {
                    type: 'Identifier',
                    name: 'Point'
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'FunctionDeclaration',
                            name: {
                                type: 'Identifier',
                                name: 'constructor'
                            },
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                {
                                    type: 'Identifier',
                                    name: 'y'
                                },
                                {
                                    type: 'Identifier',
                                    name: 'z'
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Super'
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                },
                                                {
                                                    type: 'Identifier',
                                                    name: 'y'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'ThisExpression'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'z'
                                                }
                                            },
                                            operator: '=',
                                            right: {
                                                type: 'Identifier',
                                                name: 'z'
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            type: 'FunctionDeclaration',
                            name: {
                                type: 'Identifier',
                                name: 'calc'
                            },
                            params: [],
                            body: {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Super'
                                        },
                                        arguments: []
                                    },
                                    operator: '+',
                                    right: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'ThisExpression'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'z'
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        ],
    });

    test(`
    
        new Point3D(10, 20, 30);
    
    `, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'Point3D'
                    },
                    arguments: [
                        {
                            type: 'NumericLiteral',
                            value: 10
                        },
                        {
                            type: 'NumericLiteral',
                            value: 20
                        },
                        {
                            type: 'NumericLiteral',
                            value: 30
                        }
                    ]
                }
            }
        ]
    });
};