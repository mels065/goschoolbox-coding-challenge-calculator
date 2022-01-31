import constants from '../constants';

const initialState = {
    currentCalcHistory: []
};

const calcHistoryReducer = (state=initialState, action) => {
    switch(action.type) {
        case constants.RETRIEVE_CALC_HISTORY: {
            const currentCalcHistoryLocalStorage = localStorage.getItem('calcHistory');
            if (!currentCalcHistoryLocalStorage) {
                return {
                    ...state,
                    currentCalcHistory: []
                };
            }
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

            localStorage.setItem('calcHistory', newCalcHistory);
            return {
                ...state,
                currentCalcHistory: newCalcHistory
            }
        }
        default: {
            return state;
        }
    }
};

export default calcHistoryReducer;
