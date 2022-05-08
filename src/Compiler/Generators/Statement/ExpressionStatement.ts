import LetterTypes from "../../Types";

export default function ExpressionStatement(this, node, symbols, types: Object = { ...LetterTypes }, fn) {
    return this.codegen(node.expression, symbols, fn);
}