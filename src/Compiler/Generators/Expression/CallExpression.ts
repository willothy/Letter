export default function CallExpression(this, node, symbols, fn) {
    const callArgs = [];
    for (const arg of node.args) {
        callArgs.push(this.codegen(arg, symbols, fn));
    }
    return this.builder.CreateCall(
        this.module.getFunction(node.callee.name), 
        callArgs
    );
}