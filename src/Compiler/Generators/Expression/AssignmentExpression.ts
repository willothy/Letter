export default function AssignmentExpression(this, node, symbols, fn) {
    const info = symbols[node.left.name];
    this.builder.CreateStore(
        this.checkType(
            this.codegen(node.right, symbols, fn),
            info.type
        ),
        info.alloc
    );
    return this.builder.CreateLoad(info.type, info.alloc, node.left.name);
}