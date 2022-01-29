import _, { last } from 'lodash';

import constants from '../constants';
import regexp from '../../../utils/regexp';
import numbers from '../../../utils/numbers';

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
                newDisplayInput = ['0.']
            } else if (numbers.areBothNumbers(lastInput, currentInput) || numbers.isNumberAndDecimal(lastInput, currentInput)) {
                newDisplayInput = [
                    ...displayInput.slice(0, displayInput.length - 1),
                    lastInput + currentInput
                ];
            } else if (regexp.DECIMAL_SYMBOL_ENDING.test(lastInput) && regexp.ARITHMETIC_SYMBOLS.test(currentInput)) {
                newDisplayInput = [
                    ...displayInput.slice(0, displayInput.length - 1),
                    lastInput + '0',
                    currentInput
                ]
            } else if (regexp.ARITHMETIC_SYMBOLS.test(lastInput) && /\./.test(currentInput)) {
                newDisplayInput = [
                    ...displayInput,
                    `0${currentInput}`
                ];
            } else {
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
            if (lastInput >= 10 || regexp.DECIMAL_SYMBOL_ENDING.test(lastInput)) {
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
            const newDisplayInput = [...displayInput];
            while (newDisplayInput.length > 2) {
                const operand1 = Number(newDisplayInput.shift());
                const operator = newDisplayInput.shift();
                const operand2 = Number(newDisplayInput.shift());

                switch(operator) {
                    case '+': {
                        newDisplayInput.unshift(String(operand1 + operand2));
                        break;
                    }
                    case '-': {
                        newDisplayInput.unshift(String(operand1 - operand2));
                        break;
                    }
                    case '*': {
                        newDisplayInput.unshift(String(operand1 * operand2));
                        break;
                    }
                    case '/': {
                        newDisplayInput.unshift(String(operand1 / operand2));
                        break;
                    }
                    default: {
                        throw new Error("Unexpected operator");
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default displayReducer;
