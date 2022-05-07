export default function ExpressionStatement(this, node, symbols, fn) {
    return this.codegen(node.expression, symbols, fn);
}