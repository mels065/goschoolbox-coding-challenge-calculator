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
            // A *, /, or ^ cannot be added at the beginning of an expression
            if (_.isEmpty(displayInput) && regexp.MULT_DIV_EXP_SYMBOLS.test(currentInput)) {
                return state;
            }
            // A *, /, or ^ cannot be added after another artihmetic symbol
            else if (regexp.ARITHMETIC_SYMBOLS.test(lastInput) && regexp.MULT_DIV_EXP_SYMBOLS.test(currentInput)) {
                return state;
            }

            let newDisplayInput;
            if (numbers.areBothNumbers(lastInput, currentInput)) {
                newDisplayInput = [
                    ...displayInput.slice(0, displayInput.length - 1),
                    lastInput + currentInput
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
            if (lastInput >= 10) {
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
        default: {
            return state;
        }
    }
}

export default displayReducer;
