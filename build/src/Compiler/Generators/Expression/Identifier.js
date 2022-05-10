"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Identifier(node, symbols, fn, parent) {
    const info = symbols[node.name];
    if (!info)
        throw new Error(`Variable ${node.name} is not defined.`);
    return info.isArg ? info.alloc : this.builder.CreateLoad(info.type, info.alloc, 'id_load_tmp');
}
exports.default = Identifier;
