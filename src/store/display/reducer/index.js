import _ from 'lodash';

import constants from '../constants';
import regexp from '../../../utils/regexp';

const initialState = {
    displayInput: []
}

const displayReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.APPEND_TO_DISPLAY: {
            const { displayInput } = state;
            // Get the last character of the display text for regular
            // expression validation
            const lastInput = _.tail(displayInput);
            // A *, /, or ^ cannot be added at the beginning of an expression
            if (_.isEmpty(displayInput) && regexp.MULT_DIV_EXP_SYMBOLS.test(action.payload)) {
                return state;
            }
            // A *, /, or ^ cannot be added after another artihmetic symbol
            else if (regexp.ARITHMETIC_SYMBOLS.test(lastInput) && regexp.MULT_DIV_EXP_SYMBOLS.test(action.payload)) {
                return state;
            }
            return {
                ...state,
                displayInput: [...displayInput, action.payload]
            };
        }
        case constants.UNDO_LAST_INPUT: {
            const { displayInput } = state
            const newText = displayInput.slice(0, displayInput.length - 1);

            return {
                ...state,
                displayInput: newText
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
