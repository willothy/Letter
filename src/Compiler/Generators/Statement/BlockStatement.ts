import LetterTypes from "../../Types";

export default function BlockStatement(this, node, symbols, types: Object = { ...LetterTypes }, fn): void  {
    for (const statement of node.body) {
        this.codegen(statement, symbols, fn);
    }
}