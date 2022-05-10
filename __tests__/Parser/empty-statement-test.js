const Factory = require('../../build/src/Parser/ASTFactory').default;

module.exports = test => {
    test(
        ';',
        Factory.Program([
            Factory.EmptyStatement()
        ]),
        'Empty Statement Test'
    );
}