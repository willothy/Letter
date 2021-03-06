import Tokenizer from '../Tokenizer/Tokenizer';
import Preprocessor from '../Preprocessor/Preprocessor';
import NodeFactory from './ASTFactory';


export default class Parser {
    private _program;
    private _tokenizer;
    private _preprocessor;
    private _combineFiles;
    private _lookahead;
    private _last;

    public tokenList;
    /**
     * Initializes the parser
     * 
     */
    constructor(combineFiles=false) {
        this._program = '';
        this._tokenizer = new Tokenizer();
        this._preprocessor = new Preprocessor();
        this._combineFiles = combineFiles;
    }

    /**
     * Parser interface, 
     * @param {string} program 
     * @returns ASTNode root
     */
    parse(program, filePath) {
        const ast = this._parse(program, filePath);
        
        // TODO: Typechecking, other AST validation

        return ast;
    }

    /**
     * Helper function for abstraction of parse(), parses string into an AST
     * @param {string} program 
     * @returns ASTNode root
     */
    _parse(program, filePath) {
        this._program = this._preprocessor.exec(program, filePath);

        if (this._combineFiles === true) {
            console.log(this._program);
        }

        // Special debug variable, list of all tokens. 
        // Passed by sharing to the tokenizer, tokens are appended as they are read 
        // if the -t flag is enabled
        this.tokenList = [];

        this._tokenizer.init(this._program, this.tokenList);

        // Prime the tokenizer to obtain the first token
        // which is our lookahead. The lookahead is
        // used for predictive parsing.

        this._lookahead = this._tokenizer.getNextToken();
        this._last = null;

        // Parse recursively starting from the Program entry point

        return this.Program();
    }

    /**
     * Helper function to run at the beginning of certain productions which require lookahead. 
     * @returns {void}
     */
    _precheck() {
        if (!this._tokenizer.hasMoreTokens()) throw new SyntaxError("Unexpected end of file.");
    }

    /**
     * Main entry point
     * 
     *  Program
     *      : StatementList
     *      ;
     */
    Program() {
        return NodeFactory.Program(this.StatementList())
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
     *      | ClassDeclaration
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
            case 'extern':
                return this.ExternDeclaration();
            case 'class':
                return this.ClassDeclaration();
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
     *  ClassDeclaration
     *      : 'class' Identifier OptClassExtends BlockStatement
     *      ;
     */
    ClassDeclaration() {
        this._eat('class');
        const id = this.Identifier();

        const superClass = this._lookahead.type === 'extends' ? this.ClassExtends() : null;

        const body = this.BlockStatement();

        return NodeFactory.ClassDeclaration(id, superClass, body);
    }

    /**
     *  ClassExtends
     */
    ClassExtends() {
        this._eat('extends');
        return this.Identifier();
    }

    /**
     *  FunctionDeclaration
     *      : 'proc' Identifier '(' OptFormalParameterList ')' BlockStatement
     *      ;
     */
    FunctionDeclaration() {
        this._eat('proc');
        
        const type = this.Type();
        const name = this.Identifier();

        this._eat('(');

        const params = this._lookahead.type !== ')' 
            ? this.FormalParameterList() : [];

        this._eat(')');

        const body = this.Statement();

        return NodeFactory.FunctionDeclaration(name, type, params, body);
    }

    ExternDeclaration() {
        this._eat('extern');
        const type = this.Type();
        const name = this.Identifier();

        this._eat('(');

        const params = this._lookahead.type !== ')' 
            ? this.FormalParameterList() : [];

        this._eat(')');
        this._eat(';');

        return NodeFactory.ExternDeclaration(name, type, params);
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
            const type = this.Type();
            const id = this.Identifier();
            params.push({
                type,
                id,
            });
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
        return NodeFactory.ReturnStatement(argument);        
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

        return NodeFactory.WhileStatement(test, body);
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

        return NodeFactory.DoWhileStatement(body, test);
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

        return NodeFactory.ForStatement(init, test, update, body);
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
        return NodeFactory.IfStatement(test, consequent, alternate);
    }

    /**
     *  VariableStatementInit
     *      : 'let' VariableDeclarationList 
     *      ;
     */
    VariableStatementInit() {
        this._eat('let');
        const declarations = this.VariableDeclarationList();
        return NodeFactory.VariableStatement(declarations);
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
     *      : Type Identifier OptVariableInitializer
     */
    VariableDeclaration() {
        const type = this.Type();
        const id = this.Identifier();

        const init = this._lookahead.type !== ';' && this._lookahead.type !== ',' 
            ? this.VariableInitializer() : null;

        return NodeFactory.VariableDeclaration(id, type, init);
    }

    /**
     *      Type
     *      : TYPE
     *      | TYPE MULTIPLICATIVE_OPERATOR 
     */
    Type() {
        const baseType = this._eat('IDENTIFIER').value;
        let typeStr = baseType;
        let dimensions = 0;
        let arrayType = false;
        while (this._lookahead.type == 'MULTIPLICATIVE_OPERATOR') {
            arrayType = true;
            dimensions++;
            typeStr += '*';
            this._eat('MULTIPLICATIVE_OPERATOR');
        }
        return NodeFactory.Type(baseType, typeStr, arrayType, dimensions);
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
        return NodeFactory.EmptyStatement();
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

        return NodeFactory.BlockStatement(body)
    }

    /**
     *  ExpressionStatement
     *      : Expression ';'
     */
    ExpressionStatement() {
        const expression = this.Expression();
        this._eat(';');
        return NodeFactory.ExpressionStatement(expression);
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

        return NodeFactory.AssignmentExpression(
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
        return NodeFactory.Identifier(name);
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

        throw new SyntaxError(`Invalid left-hand side in assignment`);
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

            left = NodeFactory.LogicalExpression(operator, left, right);
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

            left = NodeFactory.BinaryExpression(operator, left, right);
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
            return NodeFactory.UnaryExpression(operator, this.UnaryExpression());
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
        if (this._lookahead.type === 'super') {
            return this._CallExpression(this.Super());
        }

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
        let callExpression = NodeFactory.CallExpression(callee, this.Arguments());

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
        this._precheck();
        let object = this.PrimaryExpression();

        while (this._lookahead.type === '.' || this._lookahead.type === '[') {
            // MemberExpression '.' Identifier
            if (this._lookahead.type === '.') {
                this._eat('.');
                const property = this.Identifier();
                object = NodeFactory.MemberExpression(false, object, property);
            }

            // MemberExpression '[' Expression ']'
            if (this._lookahead.type === '[') {
                this._eat('[');
                const property = this.Expression();
                this._eat(']');
                object = NodeFactory.MemberExpression(true, object, property);
            }
        }
        return object;
    }

    /**
     *  PrimaryExpression
     *      : Literal
     *      | ParenthesizedExpression
     *      | Identifier
     *      | ThisExpression
     *      | NewExpression
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
            case 'this':
                return this.ThisExpression();
            case 'new':
                return this.NewExpression();
            default:
                return this.LeftHandSideExpression();
        }
    }

    /**
     *  NewExpression
     *      : 'new' MemberExpression Arguments -> new MyNamespace.MyClass(x, y);
     *      ;
     */
    NewExpression() {
        this._eat('new');
        const callee = this.MemberExpression();
        const args = this.Arguments();
        return NodeFactory.NewExpression(callee, args);
    }

    /**
     *  ThisExpression
     *      : 'this'
     *      ;
     */
    ThisExpression() {
        this._eat('this');
        return NodeFactory.ThisExpression();
    }

    /**
     *  Super
     *      : 'super'
     *      ;
     */
    Super() {
        this._eat('super');
        return NodeFactory.Super();
    }

    /**
     *  Check if token is a literal or not
     *  @returns bool
     */
    _isLiteral(tokenType) {
        return (
            tokenType === 'INTEGER' || 
            tokenType === 'FLOAT'   || 
            tokenType === 'STRING'  ||
            tokenType === 'true'    ||
            tokenType === 'false'   ||
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
            case 'FLOAT':
                return this.NumericLiteral(this._lookahead.type);
            case 'INTEGER': 
                return this.NumericLiteral(this._lookahead.type);
            case 'STRING': 
                return this.StringLiteral();
            case 'CHAR':
                return this.CharLiteral();
            case 'true':
                return this.BooleanLiteral(true);
            case 'false':
                return this.BooleanLiteral(false);
            case 'null':
                return this.NullLiteral();
        }
        throw new SyntaxError(`Literal: unexpected literal production "${this._lookahead.value}", last: "${JSON.stringify(this._last, null, 2)}", next: ${JSON.stringify(this._tokenizer.exec()[0])}`);
    }

    CharLiteral() {
        const token = this._eat('CHAR');
        return NodeFactory.CharLiteral(token.value.slice(1, -1));
    }

    /**
     *  BooleanLiteral
     *      : 'true'
     *      | 'false'
     *      ;
     */
    BooleanLiteral(value) {
        this._eat(value ? 'true' : 'false');
        return NodeFactory.BooleanLiteral(value);
    }

    /**
     *  BooleanLiteral
     *      : 'null'
     *      ;
     */
    NullLiteral() {
        this._eat('null');
        return NodeFactory.NullLiteral();
    }

    /**
     *  StringLiteral
     *      : STRING
     *      ;
     */
    StringLiteral() {
        const token = this._eat('STRING');
        return NodeFactory.StringLiteral(token.value.slice(1, -1));
    }

    /**
     *  NumericLiteral
     *      : NUMBER
     *      ;
     */
    NumericLiteral(type) {
        let token;
        if (type === 'INTEGER')
            token = this._eat('INTEGER');
        else if (type === 'FLOAT')
            token = this._eat('FLOAT');
        return NodeFactory.NumericLiteral(
            type,
            Number(token.value)
        );
    }

    /**
     * Expects a token of a given type
     * @returns consumed token
     */
    _eat(tokenType) {
        const token = this._lookahead;

        if (token == null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: "${tokenType}", last: "${JSON.stringify(this._last, null, 2)}", next: ${JSON.stringify(this._tokenizer.exec()[0])}`
            );
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.value}", expected: "${tokenType}", last: "${JSON.stringify(this._last, null, 2)}", next: ${JSON.stringify(this._tokenizer.exec()[0])}`
            );
        }

        // Advance parser to next token
        this._last = this._lookahead;
        this._lookahead = this._tokenizer.getNextToken();
        return token;
    }
}