import { IRBuilder, Type, Value } from "llvm-bindings";
import { ASTNode } from "../../../Parser/ASTNodes/ASTNode";
import Compiler from "../../Compiler";
import LetterTypes from "../../Types";
import LetterType from "../../Types/Type";

export default function AssignmentExpression(this: Compiler, node: ASTNode, symbols, fn, parent: ASTNode) {
    const info = symbols[node.left.name];

    const rhsValue: Value = this.checkType(
        this.codegen(node.right, symbols, fn, parent),
        info.type
    );

    const typeId = this.getKeyByValue(Type.TypeID, rhsValue.getType().getTypeID()).toLowerCase();
    const typeName = typeId.slice(0, typeId.length - 4);
    const typeInterface: LetterType = this.types[typeName];

    let newValue: Value;
    if (node.operator === '=') {
        newValue = rhsValue;
    } else {
        const currentVal = this.builder.CreateLoad(
            info.type,
            info.alloc,
            'assign_load_tmp'
        );
        switch (node.operator) {
            case '+=':
                newValue = typeInterface.add(currentVal, rhsValue, this.builder);
                break;
            case '-=':
                newValue = typeInterface.sub(currentVal, rhsValue, this.builder);
                break;
            case '*=':
                newValue = typeInterface.mul(currentVal, rhsValue, this.builder);
                break;
            case '/=':
                newValue = typeInterface.div(currentVal, rhsValue, this.builder);
                break;
        }
    }
    
    this.builder.CreateStore(
        newValue,    
        info.alloc
    );
    
    return this.builder.CreateLoad(info.type, info.alloc, node.left.name);
}