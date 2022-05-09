"use strict";
// https://stackoverflow.com/a/28191966/6884167
Object.defineProperty(exports, "__esModule", { value: true });
const llvm_bindings_1 = require("llvm-bindings");
/**
 *
 * @param {Object} object
 * @param {Value} value
 * @returns First key whose value is equal to value.
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
/**
 * Returns an LLVM primitive type from a type label string
 * @param {String} typeStr
 * @returns LLVM type
 */
function convertType(typeStr) {
    switch (typeStr) {
        case 'int':
            return this.builder.getInt32Ty();
        case 'bool':
            return this.builder.getInt1Ty();
        case 'float':
            return this.builder.getFloatTy();
        case 'double':
            return this.builder.getDoubleTy();
        case 'char':
            return this.builder.getInt8Ty();
        case 'string':
            return this.builder.getInt8PtrTy();
        default:
            return this.builder.getInt8Ty();
    }
}
/**
 *
 * @param {Type} type
 * @param {Value} value
 * @returns llvm value from JS value (WIP)
 */
function convertValue(type, value) {
    switch (type) {
        case 'int':
            return llvm_bindings_1.ConstantInt.get(this.builder.getInt32Ty(), parseInt(value, 10), true);
        case 'bool':
            return llvm_bindings_1.ConstantInt.get(this.builder.getInt1Ty(), value, false);
        case 'float':
            return llvm_bindings_1.ConstantFP.get(this.builder.getFloatTy(), parseFloat(value));
        case 'double':
            return llvm_bindings_1.ConstantFP.get(this.builder.getDoubleTy(), parseFloat(value));
        case 'char':
            return llvm_bindings_1.ConstantInt.get(this.builder.getInt8Ty(), value, false);
    }
}
/**
 *
 * @param {Value} value
 * @param {String} expectedType
 * @param {String} gotType
 * @returns new value of expected type if possible, else null
 */
function handleNumericTypecasts(value, expectedType, gotType, expectedLLVMType) {
    if (expectedType === 'Double' && gotType === 'Float') {
        return this.builder.CreateFPExt(value, this.builder.getDoubleTy(), 'flt_upcast');
    }
    else if (expectedType === 'Float' && gotType === 'Double') {
        return this.builder.CreateFPTrunc(value, this.builder.getDoubleTy(), 'dbl_downcast');
    }
    else if (expectedType === 'Double' && gotType === 'Integer') {
        return this.builder.CreateSIToFP(value, this.builder.getDoubleTy(), 'si_to_dbl');
    }
    else if (expectedType === 'Float' && gotType === 'Integer') {
        return this.builder.CreateSIToFP(value, this.builder.getFloatTy(), 'si_to_flt');
    }
    else if (expectedType === 'Integer' && (gotType === 'Float' || gotType === 'Double')) {
        return this.builder.CreateFPToSI(value, this.builder.getInt64Ty(), 'flt_to_si');
    }
    else if (expectedType === 'Integer' && gotType === 'Integer') {
        return this.builder.CreateTruncOrBitCast(value, expectedLLVMType, 'i_to_i');
    }
    return null;
}
/**
 * Checks if value is of type expectedType, attempts typecasts if not
 * @param {Value} value
 * @param {String} expectedType
 * @returns input value or post-typecast value
 * @throws TypeError if types are different and typecast fails.
 */
function checkType(value, expectedType) {
    if (!llvm_bindings_1.Type.isSameType(value.getType(), expectedType)) {
        let exp = this.getKeyByValue(llvm_bindings_1.Type.TypeID, expectedType.getTypeID());
        exp = exp.substring(0, exp.length - 4);
        let got = this.getKeyByValue(llvm_bindings_1.Type.TypeID, value.getType().getTypeID());
        got = got.substring(0, got.length - 4);
        const v = this.handleNumericTypecasts(value, exp, got, expectedType);
        if (v)
            return v;
        const typeErrorMessage = `Expected type ${exp}, got ${got}`;
        throw new TypeError(typeErrorMessage);
    }
    return value;
}
/**
 * Check if value is float
 * @param {Value}} val
 * @returns boolean
 */
function isFloat(val) {
    try {
        const test = val.getType().isFloatingPointTy();
        return true;
    }
    catch (e) {
        return false;
    }
}
/**
 * Check if value is integer
 * @param {Value} val
 * @returns
 */
function isInteger(val) {
    return val.getType().isIntegerTy(32);
}
/**
 *
 * @param {} param
 * @returns param type as LLVM.Type
 */
function resolveArrayParam(param) {
    let resolved = llvm_bindings_1.PointerType.get(this.convertType(param.type.baseType), 0);
    for (let i = 1; i < param.type.dimensions; i++) {
        resolved = llvm_bindings_1.PointerType.get(resolved, 0);
    }
    return resolved;
}
/**
 *
 * @param {returnType} returnType
 * @returns returnType as Type
 */
function resolveFuncType(returnType) {
    if (returnType.arrayType === false) {
        return this.convertType(returnType.baseType);
    }
    else {
        let resolved = llvm_bindings_1.PointerType.get(this.convertType(returnType.baseType), 0);
        for (let i = 1; i < returnType.dimensions; i++) {
            resolved = llvm_bindings_1.PointerType.get(resolved, 0);
        }
        return resolved;
    }
}
// https://stackoverflow.com/a/48682135/6884167
/**
 * Fix escape characters
 * @param {String} s
 * @returns unescaped string
 */
function unbackslash(s) {
    return s.replace(/\\([\\rnt'"])/g, function (match, p1) {
        const codes = [];
        for (const letter of p1)
            codes.push(letter.charCodeAt(0));
        if (p1 === 'n')
            return '\n';
        if (p1 === 'r')
            return '\r';
        if (p1 === 't')
            return '\t';
        if (p1 === '\\')
            return '\\';
        return p1; // unrecognised escape
    });
}
const Utils = {
    unbackslash,
    getKeyByValue,
    resolveArrayParam,
    resolveFuncType,
    isFloat,
    isInteger,
    checkType,
    handleNumericTypecasts,
    convertType,
    convertValue
};
exports.default = Utils;
