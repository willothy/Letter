import { BasicBlock, Function, IRBuilder } from "llvm-bindings";
import { ASTNode, IfStatementNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function IfStatement(this: Compiler, node: ASTNode, symbols: Object, fn: Function, parent: ASTNode) {
    const test = this.codegen(node.test, symbols, fn, parent);

    const trueCaseBB = BasicBlock.Create(this.context, 'iftrue', fn);
    const falseCaseBB = BasicBlock.Create(this.context, 'else', fn);
    this.builder.CreateCondBr(test, trueCaseBB, falseCaseBB);
    let endBB = BasicBlock.Create(this.context, 'if_conv', fn);

    this.builder.SetInsertPoint(trueCaseBB);
    this.codegen(node.consequent, symbols, fn, parent.withContext({ inIf: true }));
    this.builder.CreateBr(endBB);
    
    this.builder.SetInsertPoint(falseCaseBB);

    if (node.alternate) {
        this.codegen(node.alternate, symbols, fn, parent.withContext({ inIf: true }));
        this.builder.CreateBr(endBB);
    } else {
        this.builder.CreateBr(endBB);
    }

    this.builder.SetInsertPoint(endBB);
}