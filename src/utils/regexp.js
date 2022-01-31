const regexp = {
    NUMBERS: /\d+/,
    ARITHMETIC_SYMBOLS: /[+\-*/^]/,
    PLUS_MINUS_SYMBOLS: /[+-]/,
    LONE_PLUSES_MINUSES: /^[+-]$/,
    CHAINED_PLUSES_MINUS: /(?:[+-],){2,}\d+/, // When there are multiples +'s and -'s next to each other,
    PLUSES_MINUSES_BEGINNING: /^[+-]/, // Match begins with either + or -
    MULT_DIV_SYMBOLS: /[*/]/,
    MULT_DIV_EXP_SYMBOLS: /[*/^]/,
    MULT_DIV_EXP_THEN_PLUS_MINUS: /[*/^][+-]/, // Matches pattern where * or / is followed by + or -
    DECIMAL_SYMBOL: /\./,
    DECIMAL_SYMBOL_ENDING: /\.$/, // Match ends with decimal
    IS_DECIMAL_NUM: /\d*\.(\d+)/,
    EXPONENT_OPERATION: /(\d+)(\^)(\d+)/,
    MULT_DIV_OPERATION: /(\d+)([*/])(\d+)/,
    ADD_SUBTR_OPERATION: /(\d+)([+-])(\d+)/,
    OPEN_PARENTHESIS: /\(/,
    CLOSED_PARENTHESIS: /\)/
}

export default regexp;
