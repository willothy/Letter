import { BasicBlock, Function } from "llvm-bindings";
import { ASTNode, IfStatementNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function IfStatement(this: Compiler, node: ASTNode, symbols: Object, fn: Function, parent: ASTNode) {
    const prevInsert = this.builder.GetInsertBlock();
    const test = this.codegen(node.test, symbols, fn, parent);

    const endBB = BasicBlock.Create(this.context, 'if_end');
    fn.addBasicBlock(endBB);
    
    const falseCaseBB = BasicBlock.Create(this.context, 'else', fn, endBB);
    const trueCaseBB = BasicBlock.Create(this.context, 'iftrue', fn, falseCaseBB);

    this.builder.SetInsertPoint(trueCaseBB);
    this.codegen(node.consequent, symbols, fn, parent);
    this.builder.CreateBr(endBB);

    this.builder.SetInsertPoint(falseCaseBB);
    if (node.alternate && node.alternate.test) { 
        this.codegen(node.alternate, symbols, fn, parent);
        this.builder.SetInsertPoint(endBB);
        this.builder.CreateBr(fn.getExitBlock());
    } else if (node.alternate) {
        this.codegen(node.alternate, symbols, fn, parent);
        this.builder.CreateBr(endBB);
    } else {
        this.builder.CreateBr(endBB);
    }

    this.builder.SetInsertPoint(prevInsert);
    this.builder.CreateCondBr(test, trueCaseBB, falseCaseBB);
    this.builder.SetInsertPoint(fn.getExitBlock());
}