module.exports = (test) => {
  test(
    `
    
        proc square(x) {
            return x * x;
        }
    
    `,
    {
      // Expected AST goes here
      type: "Program",
      body: [
        {
          type: "FunctionDeclaration",
          name: {
            type: "Identifier",
            name: "square",
          },
          params: [
            {
              type: "Identifier",
              name: "x",
            },
          ],
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ReturnStatement",
                argument: {
                  type: "BinaryExpression",
                  operator: "*",
                  left: {
                    type: "Identifier",
                    name: "x",
                  },
                  right: {
                    type: "Identifier",
                    name: "x",
                  },
                },
              },
            ],
          },
        },
      ],
    }
  );

  test(
    `
    
        proc square(x) return x * x;
    
    `,
    {
      // Expected AST goes here
      type: "Program",
      body: [
        {
          type: "FunctionDeclaration",
          name: {
            type: "Identifier",
            name: "square",
          },
          params: [
            {
              type: "Identifier",
              name: "x",
            },
          ],
          body: {
            type: "ReturnStatement",
            argument: {
              type: "BinaryExpression",
              operator: "*",
              left: {
                type: "Identifier",
                name: "x",
              },
              right: {
                type: "Identifier",
                name: "x",
              },
            },
          },
        },
      ],
    }
  );
};
