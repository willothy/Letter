// https://stackoverflow.com/a/28191966/6884167

import { ConstantFP, ConstantInt, PointerType, Type } from "llvm-bindings";
import { ASTNode } from "../../Parser/ASTNodes/ASTNode";
import Compiler from "../Compiler";

function canTypeCast(this: Compiler, from: Type, to: Type) {
    if (Type.isSameType(from, to)) return true;

    let fromType: string = this.getKeyByValue(Type.TypeID, from.getTypeID());
    fromType = fromType.substring(0, fromType.length-4);
    
    let toType: string = this.getKeyByValue(Type.TypeID, to.getTypeID());
    toType = toType.substring(0, toType.length-4);

    if (toType === 'Double' && fromType === 'Float') {
        return true;
    } else if (toType === 'Float' && fromType === 'Double') {
        return true;
    } else if (toType === 'Double' && fromType === 'Integer') {
        return true;
    } else if (toType === 'Float' && fromType === 'Integer') {
        return true;
    } else if (toType === 'Integer' && (fromType === 'Float' || fromType === 'Double')) {
        return true;
    } else if (toType === 'Integer' && fromType === 'Integer') {
        return true;
    }
    return false;
}

/**
 * 
 * @param {Object} object 
 * @param {Value} value 
 * @returns First key whose value is equal to value.
 */
function getKeyByValue(this: Compiler, object, value): string  {
    return Object.keys(object).find(key => object[key] === value);
}

/**
 * Returns an LLVM primitive type from a type label string
 * @param {String} typeStr 
 * @returns LLVM type
 */
function convertType(this: Compiler, typeStr) {
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
function convertValue(this: Compiler, type, value) {
    switch (type) {
        case 'int':
            return ConstantInt.get(this.builder.getInt32Ty(), parseInt(value, 10), true);
        case 'bool':
            return ConstantInt.get(this.builder.getInt1Ty(), value, false);
        case 'float':
            return ConstantFP.get(this.builder.getFloatTy(), parseFloat(value));
        case 'double':
            return ConstantFP.get(this.builder.getDoubleTy(), parseFloat(value));
        case 'char':
            return ConstantInt.get(this.builder.getInt8Ty(), value, false);             
    }
}

/**
 * 
 * @param {Value} value 
 * @param {String} expectedType 
 * @param {String} gotType 
 * @returns new value of expected type if possible, else null
 */
function handleNumericTypecasts(this: Compiler, value, expectedType, gotType, expectedLLVMType) {
    if (expectedType === 'Double' && gotType === 'Float') {
        return this.builder.CreateFPExt(value, this.builder.getDoubleTy(), 'flt_upcast');
    } else if (expectedType === 'Float' && gotType === 'Double') {
        return this.builder.CreateFPTrunc(value, this.builder.getFloatTy(), 'dbl_downcast');
    } else if (expectedType === 'Double' && gotType === 'Integer') {
        return this.builder.CreateSIToFP(value, this.builder.getDoubleTy(), 'si_to_dbl');
    } else if (expectedType === 'Float' && gotType === 'Integer') {
        return this.builder.CreateSIToFP(value, this.builder.getFloatTy(), 'si_to_flt');
    } else if (expectedType === 'Integer' && (gotType === 'Float' || gotType === 'Double')) {
        return this.builder.CreateFPToSI(value, this.builder.getInt32Ty(), 'flt_to_si');
    } else if (expectedType === 'Integer' && gotType === 'Integer') {
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
function checkType(this: Compiler, value, expectedType) {
    if (!Type.isSameType(value.getType(), expectedType)) {
        let exp = this.getKeyByValue(Type.TypeID, expectedType.getTypeID());
        exp = exp.substring(0, exp.length-4);

        let got = this.getKeyByValue(Type.TypeID, value.getType().getTypeID());
        got = got.substring(0, got.length-4)

        const v = this.handleNumericTypecasts(value, exp, got, expectedType);
        if (v) return v;
        
        const typeErrorMessage = `Expected type ${
            exp
        }, got ${
            got
        }`;
        throw new TypeError(typeErrorMessage);
    }
    return value;
}

/**
 * Check if value is float
 * @param {Value}} val 
 * @returns boolean
 */
function isFloat(this: Compiler, val): boolean  {
    try {
        const test = val.getType().isFloatingPointTy();
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Check if value is integer
 * @param {Value} val 
 * @returns 
 */
function isInteger(this: Compiler, val) {
    return val.getType().isIntegerTy(32);
}

/**
 * 
 * @param {} param 
 * @returns param type as LLVM.Type 
 */
function resolveArrayParam(this: Compiler, param) {
    let resolved = PointerType.get(this.convertType(param.type.baseType), 0);
    for (let i = 1; i < param.type.dimensions; i++) {
        resolved = PointerType.get(resolved, 0);
    }
    return resolved;
}

/**
 * 
 * @param {returnType} returnType 
 * @returns returnType as Type
 */
function resolveFuncType(this: Compiler, returnType: ASTNode) {
    if (returnType.arrayType === false) {
        return this.convertType(returnType.baseType);
    } else {
        let resolved = PointerType.get(this.convertType(returnType.baseType), 0);
        for (let i = 1; i < returnType.dimensions; i++) {
            resolved = PointerType.get(resolved, 0);
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
function unbackslash(this: Compiler, s) {
    return s.replace(/\\([\\rnt'"])/g, function(match, p1) {
        const codes = []
        for (const letter of p1) 
            codes.push(letter.charCodeAt(0));
        
        if (p1 === 'n') return '\n';
        if (p1 === 'r') return '\r';
        if (p1 === 't') return '\t';
        if (p1 === '\\') return '\\';
        
        return p1;       // unrecognised escape
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
    convertValue,
    canTypeCast
};

export default Utils;