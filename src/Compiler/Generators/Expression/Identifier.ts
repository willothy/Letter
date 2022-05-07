export default function Identifier(this, node: any, symbols: {}) {
    const info = symbols[node.name];
    return info.isArg ? info.alloc : this.builder.CreateLoad(info.type, info.alloc, 'tmp');
}