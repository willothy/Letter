import { ASTNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function AssignmentExpression(this: Compiler, node, symbols, fn, parent: ASTNode) {
    const info = symbols[node.left.name];
    this.builder.CreateStore(
        this.checkType(
            this.codegen(node.right, symbols, fn, parent),
            info.type
        ),
        info.alloc
    );
    return this.builder.CreateLoad(info.type, info.alloc, node.left.name);
}