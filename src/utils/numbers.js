import regexp from "./regexp";

const numbers = {
    areBothNumbers: (numStr1, numStr2) => /\d/.test(numStr1) && /\d/.test(numStr2),
    isNumberAndDecimal: (numStr, decimal) => /\d/.test(numStr) && regexp.DECIMAL_SYMBOL.test(decimal),
    areBothDecimals: (decimal1, decimal2) => regexp.DECIMAL_SYMBOL_ENDING.test(decimal1) && regexp.DECIMAL_SYMBOL_ENDING.test(decimal2)
}

export default numbers;
