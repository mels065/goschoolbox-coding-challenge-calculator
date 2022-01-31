import { createStore, combineReducers } from 'redux';

import displayReducer from './display/reducer';
import calcHistoryReducer from './calcHistory/reducer';

export default createStore(combineReducers({
    display: displayReducer,
    calcHistory: calcHistoryReducer
}));
