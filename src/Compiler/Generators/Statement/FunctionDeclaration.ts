import { FunctionType, Function, BasicBlock } from "llvm-bindings";
import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function FunctionDeclaration(this: Compiler, node, symbols, types: Object, parent: ASTNode): void  {
    const params = [];
    const paramSymbols = [];
    for (const param of node.params) {
        paramSymbols.push(param.id.name);
        if (param.type.arrayType === false) {
            params.push(this.convertType(param.type.baseType));
        } else {
            const r = this.resolveArrayParam(param);
            params.push(r);
        }
    }
    
    const returnType = node.returnType.baseType === 'void' ? this.builder.getVoidTy() : this.resolveFuncType(node.returnType);
    
    const funcType = FunctionType.get(returnType, params, false);
    const func = Function.Create(
        funcType,
        Function.LinkageTypes.ExternalLinkage,
        node.name.name,
        this.module
    );
    const locals = {};
    for (const [index, symbol] of paramSymbols.entries()) {
        const arg = func.getArg(index);
        arg.setName(symbol);
        locals[symbol] = {
            type: arg.getType(),
            name: symbol,
            alloc: arg,
            isArg: true
        };
    }
    const entryBB = BasicBlock.Create(this.context, 'entry', func);
    this.builder.SetInsertPoint(entryBB);
    this.codegen(node.body, {
        ...symbols, 
        ...locals
    }, types, func, parent);
    if (node.returnType.baseType === 'void')
        this.builder.CreateRetVoid();
}