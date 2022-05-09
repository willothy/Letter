"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
function Identifier(node, symbols, types = Object.assign({}, Types_1.default)) {
    const info = symbols[node.name];
    return info.isArg ? info.alloc : this.builder.CreateLoad(info.type, info.alloc, 'id_load_tmp');
}
exports.default = Identifier;
