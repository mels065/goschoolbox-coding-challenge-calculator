import constants from "./constants"

export const appendToDisplayAction = char => ({
    type: constants.APPEND_TO_DISPLAY,
    payload: char
});
