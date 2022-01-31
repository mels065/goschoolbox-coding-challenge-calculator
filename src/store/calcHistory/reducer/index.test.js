import calcHistoryReducer from './index';

import {
    retrieveCalcHistoryAction,
    addEntryAction,
    toggleHistoryModalAction
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

    describe('addEntry action' , () => {
        it("should add a new entry to the calculator history", () => {
            Storage.prototype.setItem = jest.fn();
            const entry = ['1', '+', '2'];
            const { currentCalcHistory } = calcHistoryReducer(undefined, addEntryAction(entry));
            expect(currentCalcHistory).toEqual([entry])
        });

        it("should remove older entries if there are 10 or more in the history", () => {
            Storage.prototype.setItem = jest.fn();
            const entry = ['5', '*', '6'];
            const initialState = { currentCalcHistory: [
                ['1', '+', '2'],
                ['3', '*', '2'],
                ['16', '/', '2'],
                ['15', '-', '2'],
                ['140', '^', '2'],
                ['1', '+', '9'],
                ['4', '-', '20'],
                ['19', '*', '17'],
                ['56', '+', '27'],
                ['1', '/', '28'],
            ]};
            const { currentCalcHistory } = calcHistoryReducer(initialState, addEntryAction(entry));
            expect(currentCalcHistory).toEqual([
                ...initialState.currentCalcHistory.slice(1),
                entry
            ]);
        });

        it("should set the entry to the local storage", () => {
            Storage.prototype.setItem = jest.fn();
            const entry = ['2', '+', '3'];
            calcHistoryReducer(undefined, addEntryAction(entry));
            expect(localStorage.setItem).toBeCalledWith('calcHistory', [entry]);
        });
    });

    describe("toggleHistoryModal action" , () => {
        it("should toggle on and off", () => {
            const { showHistoryModal: showHistoryModal1 } = calcHistoryReducer(undefined, toggleHistoryModalAction());
            expect(showHistoryModal1).toEqual(true);

            const initialState = { showHistoryModal: true };
            const { showHistoryModal: showHistoryModal2 } = calcHistoryReducer(initialState, toggleHistoryModalAction());
            expect(showHistoryModal2).toEqual(false);
        })
    });
}); 
