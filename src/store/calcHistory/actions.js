import constants from './constants';

export const retrieveCalcHistoryAction = () => ({
    type: constants.RETRIEVE_CALC_HISTORY
});

export const addEntryAction = entry => ({
    type: constants.ADD_ENTRY,
    payload: entry
});

export const toggleHistoryModalAction = () => ({
    type: constants.TOGGLE_HISTORY_MODAL
});
