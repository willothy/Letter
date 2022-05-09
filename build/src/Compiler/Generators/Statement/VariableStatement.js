"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
const Types_1 = require("../../Types");
function VariableStatement(node, symbols, types = Object.assign({}, Types_1.default), fn) {
    for (const declaration of node.declarations) {
        const type = this.convertType(declaration.valType.baseType);
        const alloc = this.builder.CreateAlloca(type, llvm_bindings_1.ConstantInt.get(this.builder.getInt8Ty(), 0, false), declaration.id.name);
        if (declaration.init) {
            symbols[declaration.id.name] = {
                name: declaration.id.name,
                type: type,
                alloc: alloc
            };
            this.builder.CreateStore(this.checkType(this.codegen(declaration.init, symbols, fn), type), alloc);
        }
    }
}
exports.default = VariableStatement;
