export default function BlockStatement(this, node, symbols, fn) {
    for (const statement of node.body) {
        this.codegen(statement, symbols, fn);
    }
}