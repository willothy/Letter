import ASTNode from "../../../Parser/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";

export default function AssignmentExpression(this: Compiler, node, symbols, types: Object, fn, parent: ASTNode) {
    const info = symbols[node.left.name];
    this.builder.CreateStore(
        this.checkType(
            this.codegen(node.right, symbols, types, fn, parent),
            info.type
        ),
        info.alloc
    );
    return this.builder.CreateLoad(info.type, info.alloc, node.left.name);
}