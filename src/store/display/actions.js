import constants from "./constants"

export const appendToDisplayAction = char => ({
    type: constants.APPEND_TO_DISPLAY,
    payload: char
});

export const undoLastInputAction = char => ({
    type: constants.UNDO_LAST_INPUT
});

export const clearDisplayAction = () => ({
    type: constants.CLEAR_DISPLAY
});

export const calculateAction = () => ({
    type: constants.CALCULATE
});
