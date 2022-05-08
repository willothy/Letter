import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function ReturnStatement(this: Compiler, node, symbols, types: Object = { ...LetterTypes }, fn): void  {
    this.builder.CreateRet(this.codegen(node.argument, symbols, fn));
}