import llvm = require("llvm-bindings");
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function ReturnStatement(this: Compiler, node, symbols, types: Object, fn: llvm.Function, parent: ASTNode): void  {
    const gen = this.codegen(node.argument, symbols, types, fn, node);
    //console.log(fn.getReturnType().getTypeID(), gen);
    this.builder.CreateRet(this.checkType(gen, fn.getReturnType()));
}