import llvm = require("llvm-bindings");
import ASTNode from "../../../Parser/ASTNode";
import LetterTypes from "../../Types";

export default function Identifier(this, node: any, symbols: Object, fn: llvm.Function, parent: ASTNode) {
    const info = symbols[node.name];
    if (!info)
        throw new Error(`Variable ${node.name} is not defined.`)
    return info.isArg ? info.alloc : this.builder.CreateLoad(info.type, info.alloc, 'id_load_tmp');
}