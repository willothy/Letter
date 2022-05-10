module.exports = test => {
	test(`
    
        class Point {
            proc constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        
            class Test {
                proc constructor(str) {
                    this.expect = str;
                }
        
                proc calc() return this.x + this.y;
            }
        }
        
        let point = new Point(x, y);
    
    `, {
		"type": "Program",
		"body": [{
				"type": "ClassDeclaration",
				"id": {
					"type": "Identifier",
					"name": "Point"
				},
				"superClass": null,
				"body": {
					"type": "BlockStatement",
					"body": [{
							"type": "FunctionDeclaration",
							"name": {
								"type": "Identifier",
								"name": "constructor"
							},
							"params": [{
									"type": "Identifier",
									"name": "x"
								},
								{
									"type": "Identifier",
									"name": "y"
								}
							],
							"body": {
								"type": "BlockStatement",
								"body": [{
										"type": "ExpressionStatement",
										"expression": {
											"type": "AssignmentExpression",
											"operator": "=",
											"left": {
												"type": "MemberExpression",
												"computed": false,
												"object": {
													"type": "ThisExpression"
												},
												"property": {
													"type": "Identifier",
													"name": "x"
												}
											},
											"right": {
												"type": "Identifier",
												"name": "x"
											}
										}
									},
									{
										"type": "ExpressionStatement",
										"expression": {
											"type": "AssignmentExpression",
											"operator": "=",
											"left": {
												"type": "MemberExpression",
												"computed": false,
												"object": {
													"type": "ThisExpression"
												},
												"property": {
													"type": "Identifier",
													"name": "y"
												}
											},
											"right": {
												"type": "Identifier",
												"name": "y"
											}
										}
									}
								]
							}
						},
						{
							"type": "ClassDeclaration",
							"id": {
								"type": "Identifier",
								"name": "Test"
							},
							"superClass": null,
							"body": {
								"type": "BlockStatement",
								"body": [{
										"type": "FunctionDeclaration",
										"name": {
											"type": "Identifier",
											"name": "constructor"
										},
										"params": [{
											"type": "Identifier",
											"name": "str"
										}],
										"body": {
											"type": "BlockStatement",
											"body": [{
												"type": "ExpressionStatement",
												"expression": {
													"type": "AssignmentExpression",
													"operator": "=",
													"left": {
														"type": "MemberExpression",
														"computed": false,
														"object": {
															"type": "ThisExpression"
														},
														"property": {
															"type": "Identifier",
															"name": "expect"
														}
													},
													"right": {
														"type": "Identifier",
														"name": "str"
													}
												}
											}]
										}
									},
									{
										"type": "FunctionDeclaration",
										"name": {
											"type": "Identifier",
											"name": "calc"
										},
										"params": [],
										"body": {
											"type": "ReturnStatement",
											"argument": {
												"type": "BinaryExpression",
												"operator": "+",
												"left": {
													"type": "MemberExpression",
													"computed": false,
													"object": {
														"type": "ThisExpression"
													},
													"property": {
														"type": "Identifier",
														"name": "x"
													}
												},
												"right": {
													"type": "MemberExpression",
													"computed": false,
													"object": {
														"type": "ThisExpression"
													},
													"property": {
														"type": "Identifier",
														"name": "y"
													}
												}
											}
										}
									}
								]
							}
						}
					]
				}
			},
			{
				"type": "VariableStatement",
				"declarations": [{
					"type": "VariableDeclaration",
					"id": {
						"type": "Identifier",
						"name": "point"
					},
					"init": {
						"type": "NewExpression",
						"callee": {
							"type": "Identifier",
							"name": "Point"
						},
						"arguments": [{
								"type": "Identifier",
								"name": "x"
							},
							{
								"type": "Identifier",
								"name": "y"
							}
						]
					}
				}]
			}
		]
	});
};