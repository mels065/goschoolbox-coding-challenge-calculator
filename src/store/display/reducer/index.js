import _ from 'lodash';

import constants from '../constants';
import regexp from '../../../utils/regexp';

const initialState = {
    displayText: ""
}

const displayReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.APPEND_TO_DISPLAY: {
            const { displayText } = state;
            // Get the last character of the display text for regular
            // expression validation
            const lastCharDisplayText = _.tail(displayText);
            // A *, /, or ^ cannot be added at the beginning of an expression
            if (_.isEmpty(displayText) && regexp.MULT_DIV_EXP_SYMBOLS.test(action.payload)) {
                return state;
            }
            // A *, /, or ^ cannot be added after another artihmetic symbol
            else if (regexp.ARITHMETIC_SYMBOLS.test(lastCharDisplayText) && regexp.MULT_DIV_EXP_SYMBOLS.test(action.payload)) {
                return state;
            }
            return {
                ...state,
                displayText: `${state.displayText}${action.payload}`
            };
        }
        case constants.UNDO_LAST_INPUT: {
            const { displayText } = state
            const newText = displayText.slice(0, displayText.length - 1);

            return {
                ...state,
                displayText: newText
            };
        }
        case constants.CLEAR_DISPLAY: {
            return {
                ...state,
                displayText: ''
            };
        }
        default: {
            return state;
        }
    }
}

export default displayReducer;
