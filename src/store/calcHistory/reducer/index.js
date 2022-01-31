import constants from '../constants';

const initialState = {
    currentCalcHistory: [],
    showHistoryModal: false
};

const calcHistoryReducer = (state=initialState, action) => {
    switch(action.type) {
        case constants.RETRIEVE_CALC_HISTORY: {
            let currentCalcHistoryLocalStorage = localStorage.getItem('calcHistory');
            if (!currentCalcHistoryLocalStorage) {
                return {
                    ...state,
                    currentCalcHistory: []
                };
            }
            currentCalcHistoryLocalStorage = JSON.parse(currentCalcHistoryLocalStorage);
            return {
                ...state,
                currentCalcHistory: currentCalcHistoryLocalStorage
            }
        }
        case constants.ADD_ENTRY: {
            let newCalcHistory = [
                ...state.currentCalcHistory,
                action.payload
            ];

            if (newCalcHistory.length > 10) {
                newCalcHistory = newCalcHistory.slice(1);
            }

            localStorage.setItem('calcHistory', JSON.stringify(newCalcHistory));
            return {
                ...state,
                currentCalcHistory: newCalcHistory
            }
        }
        case constants.TOGGLE_HISTORY_MODAL: {
            return {
                ...state,
                showHistoryModal: !state.showHistoryModal
            }
        }
        default: {
            return state;
        }
    }
};

export default calcHistoryReducer;
