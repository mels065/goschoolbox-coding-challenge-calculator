import { createStore, combineReducers } from 'redux';

import displayReducer from './display/reducer';

export default createStore(combineReducers({
    display: displayReducer
}));
