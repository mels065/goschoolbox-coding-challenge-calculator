import _ from 'lodash';

import constants from '../constants';
import regexp from '../../../utils/regexp';
import numbers from '../../../utils/numbers';
import calc from '../../../utils/calc';

const initialState = {
    displayInput: []
}

const displayReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.APPEND_TO_DISPLAY: {
            const { displayInput } = state;
            const currentInput = action.payload;
            // Get the last character of the display text for regular
            // expression validation
            const lastInput = _.last(displayInput);
            if (_.isEmpty(displayInput) && regexp.MULT_DIV_EXP_SYMBOLS.test(currentInput)) {
                // A *, /, or ^ cannot be added at the beginning of an expression
                return state;
            } else if (regexp.ARITHMETIC_SYMBOLS.test(lastInput) && regexp.MULT_DIV_EXP_SYMBOLS.test(currentInput)) {
                // A *, /, or ^ cannot be added after another artihmetic symbol
                return state;
            } else if (numbers.areBothDecimals(lastInput, currentInput)) {
                return state;
            }

            let newDisplayInput;
            if (_.isEmpty(displayInput) && regexp.DECIMAL_SYMBOL.test(currentInput)) {
                // If nothing is in the display, and the user enters a decimal point, prepend a 0 before it
                newDisplayInput = ['0.']
            } else if (numbers.areBothNumbers(lastInput, currentInput) || numbers.isNumberAndDecimal(lastInput, currentInput)) {
                // If both the last input and current are numbers, or if the last input was a number and the current is a decimal point
                // combine them as one element in the display input array
                newDisplayInput = [
                    ...displayInput.slice(0, displayInput.length - 1),
                    lastInput + currentInput
                ];
            } else if (regexp.DECIMAL_SYMBOL_ENDING.test(lastInput) && regexp.ARITHMETIC_SYMBOLS.test(currentInput)) {
                // If the last input was a decimal symbol and the current is an arithmetic operator, append a 0 to the decimal point
                newDisplayInput = [
                    ...displayInput.slice(0, displayInput.length - 1),
                    lastInput + '0',
                    currentInput
                ]
            } else if (regexp.ARITHMETIC_SYMBOLS.test(lastInput) && regexp.DECIMAL_SYMBOL.test(currentInput)) {
                // If the last input was an arithmetic operator and the current is a decimal point, prepend a 0 to the decimal point
                newDisplayInput = [
                    ...displayInput,
                    `0${currentInput}`
                ];
            } else if (regexp.NUMBERS.test(lastInput) && regexp.OPEN_PARENTHESIS.test(currentInput)) {
                // If the last input was a number, and the current input is an open parenthesis, prepend a multiplication symbol as
                // an element in the current input before the open parenthesis
                newDisplayInput = [
                    ...displayInput,
                    '*',
                    currentInput
                ]
            } else {
                // Any other case, just append the current input to the display input array
                newDisplayInput = [...displayInput, currentInput];
            }
            return {
                ...state,
                displayInput: newDisplayInput
            };
        }
        case constants.UNDO_LAST_INPUT: {
            const { displayInput } = state
            const lastInput = _.last(displayInput);

            let newDisplayInput = [...lastInput];
            if (lastInput >= 10 || regexp.DECIMAL_SYMBOL.test(lastInput)) {
                // If the last input was either a number greater than 10, or has a decimal in it, remove the last character in the
                // last input element
                newDisplayInput = [
                    ...displayInput.slice(0, displayInput.length - 1),
                    lastInput.slice(0, lastInput.length-1)
                ]
            } else {
                newDisplayInput = displayInput.slice(0, displayInput.length - 1);
            }

            return {
                ...state,
                displayInput: newDisplayInput
            };
        }
        case constants.CLEAR_DISPLAY: {
            return {
                ...state,
                displayInput: []
            };
        }
        case constants.CALCULATE: {
            const { displayInput } = state;

            if (_.isEmpty(displayInput)) {
                return {
                    ...state,
                    displayInput: ['0']
                }
            }

            const calculationReturn = calc.calculate(displayInput);

            let newDisplayInput;
            if (!calculationReturn) {
                // If null was returned, something was wrong with the expression. Return the expression as it was.
                newDisplayInput = [...displayInput];
            } else {
                newDisplayInput = calculationReturn.result;
            }

            return {
                ...state,
                displayInput: newDisplayInput
            }
        }
        default: {
            return state;
        }
    }
}

export default displayReducer;
