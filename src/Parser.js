
const {Tokenizer} = require('./Tokenizer');
const {Factories} = require('./ASTFactories');

const AST_MODE = 'default';

const factory = Factories[AST_MODE];

class Parser {
    /**
     * Initializes the parser
     * 
     */
    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    /**
     * Parses string into an AST
     * @param {*} string 
     * @returns ASTNode root
     */
    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        // Prime the tokenizer to obtain the first token
        // which is our lookahead. The lookahead is
        // used for predictive parsing.

        this._lookahead = this._tokenizer.getNextToken();

        // Parse recursively starting from the Program entry point

        return this.Program();
    }

    /**
     * Main entry point
     * 
     *  Program
     *      : StatementList
     *      ;
     */
    Program() {
        return factory.Program(this.StatementList())
    }

    /**
     *  StatementList
     *      : Statement
     *      | StatementList Statement -> Statement Statement Statement ...
     *      ;
     */
    StatementList(stopLookahead = null) {
        const statementList = [this.Statement()];

        while(this._lookahead != null && this._lookahead.type !== stopLookahead) {
            statementList.push(this.Statement());
        }

        return statementList;
    }


    /**
     *  Statement
     *      : ExpressionStatement
     *      | BlockStatement
     *      | EmptyStatement
     *      | VariableStatement
     *      | IfStatement
     *      | IterationStatement
     *      | FunctionDeclaration
     *      | ReturnStatement
     *      ;
     */
    Statement() {
        switch(this._lookahead.type) {
            case ';':
                return this.EmptyStatement();
            case 'if':
                return this.IfStatement();
            case '{': 
                return this.BlockStatement();
            case 'let':
                return this.VariableStatement();
            case 'proc':
                return this.FunctionDeclaration();
            case 'return':
                return this.ReturnStatement();
            case 'while':
            case 'do':
            case 'for':
                return this.IterationStatement();
            default: 
                return this.ExpressionStatement();
        }
    }

    /**
     *  FunctionDeclaration
     *      : 'proc' Identifier '(' OptFormalParameterList ')' BlockStatement
     *      ;
     */
    FunctionDeclaration() {
        this._eat('proc');
        const name = this.Identifier();

        this._eat('(');

        const params = this._lookahead.type !== ')' 
            ? this.FormalParameterList() : [];

        this._eat(')');

        const body = this.Statement();

        return factory.FunctionDeclaration(name, params, body);
    }

    /**
     *  FormalParameterList
     *      : Identifier
     *      | FormalParameterList ',' Identifier
     *      ;
     */
    FormalParameterList() {
        const params = [];

        do {
            params.push(this.Identifier());
        } while (this._lookahead.type === ',' && this._eat(','));
        return params;
    }

    /**
     *  ReturnStatement
     *      : 'return' OptExpression ';'
     *      ;
     */
    ReturnStatement() {
        this._eat('return');
        const argument = this._lookahead.type !== ';' ? this.Expression() : null;
        this._eat(';');
        return factory.ReturnStatement(argument);        
    }

    /**
     *  IterationStatement
     *      : WhileStatement
     *      | DoWhileStatement
     *      | ForStatement
     *      ;
     */
    IterationStatement() {
        switch (this._lookahead.type) {
            case 'while':
                return this.WhileStatement();
            case 'do':
                return this.DoWhileStatement();
            case 'for':
                return this.ForStatement();            
        }
    }

    /**
     *  WhileStatement
     *      : 'while' '(' Expression ')' Statement
     *      ;
     */ 
    WhileStatement() {
        this._eat('while');

        this._eat('(');
        const test = this.Expression();
        this._eat(')');

        const body = this.Statement();

        return factory.WhileStatement(test, body);
    }   

    /**
     *  DoWhileStatement
     *      : 'do' Statement 'while' '(' Expression ')' ';'
     *      ;
     */ 
    DoWhileStatement() {
        this._eat('do');
        const body = this.Statement();

        this._eat('while');
        this._eat('(');
        const test = this.Expression();
        this._eat(')');
        this._eat(';');

        return factory.DoWhileStatement(body, test);
    }   


    /**
     *  ForStatement
     *      : 'for' '(' OptForStatementInit ';' OptExpression ';' OptExpression ';' ')' Statement
     */
    ForStatement() {
        this._eat('for');
        this._eat('(');

        const init = this._lookahead.type !== ';' ? this.ForStatementInit() : null;
        this._eat(';');

        const test = this._lookahead.type !== ';' ? this.Expression() : null;
        this._eat(';');

        const update = this._lookahead.type !== ';' ? this.Expression() : null;
        this._eat(')');

        const body = this.Statement();

        return factory.ForStatement(init, test, update, body);
    }

    /**
     *  ForStatementInit
     *      : VariableStatementInit
     *      | Expression
     *      ;
     */
    ForStatementInit() {
        if (this._lookahead.type === 'let') {
            return this.VariableStatementInit();
        }
        return this.Expression();
    }

    /**
     *  IfStatement
     *      : 'if' '(' Expression ')' Statement
     *      | 'if' '(' Expression ')' Statement 'else' Statement
     *      ;
     */
    IfStatement() {
        this._eat('if');

        this._eat('(');
        const test = this.Expression();
        this._eat(')');

        const consequent = this.Statement();
        const alternate = this._lookahead != null && this._lookahead.type === 'else'
            ? this._eat('else') && this.Statement() : null;
        return factory.IfStatement(test, consequent, alternate);
    }

    /**
     *  VariableStatementInit
     *      : 'let' VariableDeclarationList 
     *      ;
     */
    VariableStatementInit() {
        this._eat('let');
        const declarations = this.VariableDeclarationList();
        return factory.VariableStatement(declarations);
    }

    /**
     *  VariableStatement
     *      : 'let' VariableDeclarationList ';'
     *      ;
     */
    VariableStatement() {
        const variableStatement = this.VariableStatementInit();
        this._eat(';');
        return variableStatement;
    }

    /**
     *  VariableDeclarationList
     *      : VariableDeclaration
     *      | VariableDeclarationList ',' VariableDeclaration
     *      ;
     */
    VariableDeclarationList() {
        const declarations = [];

        do {
            declarations.push(this.VariableDeclaration());
        } while (this._lookahead.type == ',' && this._eat(','));

        return declarations;
    }

    /**
     *  VariableDeclaration
     *      : Identifier OptVariableInitializer
     */
    VariableDeclaration() {
        const id = this.Identifier();

        const init = this._lookahead.type !== ';' && this._lookahead.type !== ',' 
            ? this.VariableInitializer() : null;

        return factory.VariableDeclaration(id, init);
    }

    /**
     *  VariableInitializer
     *      : SIMPLE_ASSIGN AssignmentExpression
     *      ;
     */
    VariableInitializer() {
        this._eat('SIMPLE_ASSIGN');
        return this.AssignmentExpression();
    }

    /**
     *  EmptyStatement
     *      : ';'
     *      ;
     */
    EmptyStatement() {
        this._eat(';');
        return factory.EmptyStatement();
    }

    /**
     *  BlockStatement
     *      : '{' OptStatementList '}'
     *      ;
     */
    BlockStatement() {
        this._eat('{');

        const body = this._lookahead.type !== '}' ? this.StatementList('}') : [];

        this._eat('}');

        return factory.BlockStatement(body)
    }

    /**
     *  ExpressionStatement
     *      : Expression ';'
     */
    ExpressionStatement() {
        const expression = this.Expression();
        this._eat(';');
        return factory.ExpressionStatement(expression);
    }

    /**
     *  Expression
     *      : Literal
     *      ;
     */
    Expression() {
        return this.AssignmentExpression();
    }

    /**
     *  AssignmentExpression
     *      : LogicalORExpression // Lowest precedence
     *      | LeftHandSideExpression AssignmentOperator AssignmentExpression
     */
    AssignmentExpression() {
        const left = this.LogicalORExpression();

        if (!this._isAssignmentOperator(this._lookahead.type)) {
            return left;
        }

        return factory.AssignmentExpression(
            this.AssignmentOperator().value, 
            this._checkValidAssignmentTarget(left),
            this.AssignmentExpression()
        );
    }

    /**
     *  EqualityExpression
     *      : RelationalExpression EQUALITY_OPERATOR EqualityExpression
     *      | RelationalExpression
     */
    EqualityExpression() {
        return this._BinaryExpression('RelationalExpression', 'EQUALITY_OPERATOR');
    }

    /**
     *  RelationalExpression
     *      : AdditiveExpression
     *      | AdditiveExpression RELATIONAL_OPERATOR RelationalExpression
     *      ;
     */
    RelationalExpression() {
        return this._BinaryExpression('AdditiveExpression', 'RELATIONAL_OPERATOR');
    }

    

    /**
     *  Identifier
     */
    Identifier() {
        const name = this._eat('IDENTIFIER').value;
        return factory.Identifier(name);
    }

    /**
     *  Determines whether the token is an assignment operator
     *  @returns bool
     */
    _isAssignmentOperator(tokenType) {
        return tokenType === 'SIMPLE_ASSIGN' || tokenType === 'COMPLEX_ASSIGN';
    }

    /**
     *  Check whether assignment target is valid
     */
    _checkValidAssignmentTarget(node) {
        if (node.type === 'Identifier' || node.type === 'MemberExpression') return node;

        throw new SyntaxError('Invalid left-hand side in assignment expression');
    }

    /**
     *  AssignmentOperator
     *      : SIMPLE_ASSIGN
     *      | COMPLEX_ASSIGN
     *      ;
     */
    AssignmentOperator() {
        if (this._lookahead.type === 'SIMPLE_ASSIGN') {
            return this._eat('SIMPLE_ASSIGN');
        }
        return this._eat('COMPLEX_ASSIGN');
    }

    /**
     *  Logical AND Expression
     * 
     *  LogicalANDExpression
     *      : EqualityExpression LOGICAL_AND LogicalANDExpression
     *      | EqualityExpression
     *      ;
     */
    LogicalANDExpression() {
        return this._LogicalExpression('EqualityExpression', 'LOGICAL_AND');
    }

    /**
     *  Logical OR Expression
     * 
     *  LogicalORExpression
     *      : LogicalANDExpression LOGICAL_OR LogicalORExpression
     *      | LogicalORExpression
     *      ;
     */
    LogicalORExpression() {
        return this._LogicalExpression('LogicalANDExpression', 'LOGICAL_OR');
    }

    /**
     *  AdditiveExpression
     *      : MultiplicativeExpression
     *      | AdditiveExpression ADDITIVE_OPERAND MultiplicativeExpression
     */
    AdditiveExpression() {
        return this._BinaryExpression('MultiplicativeExpression', 'ADDITIVE_OPERATOR');
    }

    /**
     *  MultiplicativeExpression
     *      : UnaryExpression
     *      | MultiplicativeExpression MULTIPLICATIVE_OPERATOR UnaryExpression -> PrimaryExpression MULTIPLICATIVE_OPERATOR ...
     */
    MultiplicativeExpression() {
        return this._BinaryExpression('UnaryExpression', 'MULTIPLICATIVE_OPERATOR');
    }

    /**
     *  Helper for LogicalExpression nodes
     */
    _LogicalExpression(builderName, operatorToken) {
        let left = this[builderName]();

        while (this._lookahead.type === operatorToken) {
            const operator = this._eat(operatorToken).value;

            const right = this[builderName]();

            left = factory.LogicalExpression(operator, left, right);
        }
        return left;
    }

    /**
     *  Generic binary expression
     */
    _BinaryExpression(builderName, operatorToken) {
        let left = this[builderName]();
        while(this._lookahead.type === operatorToken) {
            // Operator *, /
            const operator = this._eat(operatorToken).value;

            const right = this[builderName]();

            left = factory.BinaryExpression(operator, left, right);
        }

        return left;
    }

    /**
     *  UnaryExpression
     *      : LeftHandSideExpression
     *      | ADDITIVE_OPERATOR UnaryExpression
     *      | LOGICAL_NOT UnaryExpression
     *      ;
     */
    UnaryExpression() {
        let operator;
        switch (this._lookahead.type) {
            case 'ADDITIVE_OPERATOR':
                operator = this._eat('ADDITIVE_OPERATOR').value;
                break;
            case 'LOGICAL_NOT':
                operator = this._eat('LOGICAL_NOT').value;
                break;
        }
        if (operator != null) {
            return factory.UnaryExpression(operator, this.UnaryExpression());
        }
        return this.LeftHandSideExpression();
    }

    /** 
     *  LeftHandSideExpression
     *      : CallMemberExpression
     *      ;
     */
    LeftHandSideExpression() {
        return this.CallMemberExpression();
    }

    /**
     *  CallMemberExpression
     *      : MemberExpression
     *      | CallExpression
     *      ;
     */
    CallMemberExpression() {
        const member = this.MemberExpression();

        if (this._lookahead.type === '(') {
            return this._CallExpression(member);
        }
        return member;
    }

    /**
     *  CallExpression
     *      : Callee Arguments
     * 
     *  Callee
     *      : MemberExpression
     *      | CallExpression
     *      ;
     */
    _CallExpression(callee) {
        let callExpression = factory.CallExpression(callee, this.Arguments());

        if (this._lookahead.type === '(') {
            callExpression = this._CallExpression(callExpression);
        }

        return callExpression;
    }

    /**
     *  Arguments
     *      : '(' OptArgumentList ')'
     *      ;
     */
    Arguments() {
        this._eat('(');

        const argumentList = this._lookahead.type !== ')' ? this.ArgumentList() : [];

        this._eat(')');
        return argumentList;
    }

    /**
     *  ArgumentList
     *      : AssignmentExpression
     *      | ArgumentList ',' AssignmentExpression
     */
    ArgumentList() {
        const argumentList = [];

        do {
            argumentList.push(this.AssignmentExpression());
        } while (this._lookahead.type === ',' && this._eat(','));

        return argumentList;
    }

    /**
     *  MemberExpression
     *      : PrimaryExpression
     *      | MemberExpression '.' Identifier
     *      | MemberExpression '[' Expression ']'
     *      ;
     */
    MemberExpression() {
        let object = this.PrimaryExpression();

        while (this._lookahead.type === '.' || this._lookahead.type === '[') {
            // MemberExpression '.' Identifier
            if (this._lookahead.type === '.') {
                this._eat('.');
                const property = this.Identifier();
                object = factory.MemberExpression(false, object, property);
            }

            // MemberExpression '[' Expression ']'
            if (this._lookahead.type === '[') {
                this._eat('[');
                const property = this.Expression();
                this._eat(']');
                object = factory.MemberExpression(true, object, property);
            }
        }
        return object;
    }

    /**
     *  PrimaryExpression
     *      : Literal
     *      | ParenthesizedExpression
     *      | Identifier
     *      ;
     */
    PrimaryExpression() {
        if (this._isLiteral(this._lookahead.type)) {
            return this.Literal();
        }
        switch (this._lookahead.type) {
            case '(': 
                return this.ParenthesizedExpression();
            case 'IDENTIFIER':
                return this.Identifier();
            default:
                return this.LeftHandSideExpression();
        }
    }

    /**
     *  Check if token is a literal or not
     *  @returns bool
     */
    _isLiteral(tokenType) {
        return (
            tokenType === 'NUMBER' || 
            tokenType === 'STRING' ||
            tokenType === 'true'   ||
            tokenType === 'false'  ||
            tokenType === 'null'     
        );
    }


    /**
     *  ParenthesizedExpression
     *      : '(' Expression ')'
     *      ;
     */
    ParenthesizedExpression() {
        this._eat('(');
        const expression = this.Expression();
        this._eat(')');
        return expression;
    }

    /**
     *  Literal
     *      : NumericLiteral
     *      | StringLiteral
     *      | BooleanLiteral
     *      | NullLiteral
     *      ;
     */
    Literal() {
        switch(this._lookahead.type) {
            case 'NUMBER': 
                return this.NumericLiteral();
            case 'STRING': 
                return this.StringLiteral();
            case 'true':
                return this.BooleanLiteral(true);
            case 'false':
                return this.BooleanLiteral(false);
            case 'null':
                return this.NullLiteral();
        }
        throw new SyntaxError(`Literal: unexpected literal production "${this._lookahead.value || '<cannot read literal>'}"`);
    }

    /**
     *  BooleanLiteral
     *      : 'true'
     *      | 'false'
     *      ;
     */
    BooleanLiteral(value) {
        this._eat(value ? 'true' : 'false');
        return factory.BooleanLiteral(value);
    }

    /**
     *  BooleanLiteral
     *      : 'null'
     *      ;
     */
    NullLiteral() {
        this._eat('null');
        return factory.NullLiteral();
    }

    /**
     *  StringLiteral
     *      : STRING
     *      ;
     */
    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1),
        };
    }

    /**
     *  NumericLiteral
     *      : NUMBER
     *      ;
     */
    NumericLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumericLiteral',
            value: Number(token.value),
        };
    }

    /**
     * Expects a token of a given type
     * @returns consumed token
     */
    _eat(tokenType) {
        const token = this._lookahead;

        if (token == null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: "${tokenType}"`
            );
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.value}", expected: "${tokenType}"`
            )
        }

        // Advance parser to next token
        this._lookahead = this._tokenizer.getNextToken();

        return token;
    }
}

module.exports = {
    Parser
}