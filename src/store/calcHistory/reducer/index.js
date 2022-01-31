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
        default: {
            return state;
        }
    }
};

export default calcHistoryReducer;
