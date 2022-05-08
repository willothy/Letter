import LetterTypes from "../../Types";

export default function Identifier(this, node: any, symbols: Object, types: Object = { ...LetterTypes }) {
    const info = symbols[node.name];
    return info.isArg ? info.alloc : this.builder.CreateLoad(info.type, info.alloc, 'id_load_tmp');
}