import calcHistoryReducer from './index';

import {
    retrieveCalcHistoryAction
} from '../actions';

describe("calcHistoryReducer", () => {
    describe("retrieveCalcHistory action", () => {
        it("should invoke getItem on local storage", () => {
            Storage.prototype.getItem = jest.fn();
            calcHistoryReducer(undefined, retrieveCalcHistoryAction());
            expect(localStorage.getItem).toBeCalledWith('calcHistory');
        })
        it("should return an empty array if there is no history in the local storage", () => {
            Storage.prototype.getItem = () => null;
            const { currentCalcHistory } = calcHistoryReducer(undefined, retrieveCalcHistoryAction());
            expect(currentCalcHistory).toEqual([]);
        });

        it("should return the calc history array if in local storage", () => {
            const currentCalcHistoryLocalStorage = [
                ['1', '+', '1'],
                ['7', '*', '8', '+', '3']
            ]
            Storage.prototype.getItem = () => currentCalcHistoryLocalStorage;
            const { currentCalcHistory } = calcHistoryReducer(undefined, retrieveCalcHistoryAction());
            expect(currentCalcHistory).toEqual(currentCalcHistoryLocalStorage);
        });
    });
});
