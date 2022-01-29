import displayReducer from '../reducer';
import {
    appendToDisplayAction,
    clearDisplayAction,
    undoLastInputAction,
    calculateAction
} from '../actions';

describe('displayReducer', () => {
    describe('appendToDisplay', () => {
        it("should append to existing display", () => {
            expect(displayReducer(undefined, appendToDisplayAction('1')).displayInput)
                .toEqual(["1"]);
            const initialState = { displayInput: ['1'] };
            expect(displayReducer(initialState, appendToDisplayAction('+')).displayInput)
                .toEqual(["1", "+"]);
        });

        it("should be appended to last entry if previous and current entries are numbers", () => {
            const initialState = { displayInput: ['1'] };
            expect(displayReducer(initialState, appendToDisplayAction('2')).displayInput)
                .toEqual(['12']);
        })

        it("should not be able to append '*', '/', and '-' at the beginning of the expression", () => {
            expect(displayReducer(undefined, appendToDisplayAction('*')).displayInput).toEqual([]);
            expect(displayReducer(undefined, appendToDisplayAction('/')).displayInput).toEqual([]);
            expect(displayReducer(undefined, appendToDisplayAction('^')).displayInput).toEqual([]);
        });

        it("should not be able to append '*', '/', or '/' to any arithmetic operator", () => {
            let multDivExpSymbols = ['*', '/', '^'];
            let arithmeticSymbols = ['+', '-', ...multDivExpSymbols];

            for (let sym1 of arithmeticSymbols) {
                const initialState = { displayInput: ['5', sym1] };
                for (let sym2 of multDivExpSymbols) {
                    expect(displayReducer(initialState, appendToDisplayAction(sym2)).displayInput).toEqual(['5', sym1]);
                }
            }
        });
    });

    describe('undoLastInput', () => {
        it("should remove the last input at the end of the display", () => {
            const initiaState = { displayInput: ['1'] };
            expect(displayReducer(initiaState, undoLastInputAction()).displayInput).toEqual([]);
            initiaState.displayInput = ['1', '+'];
            expect(displayReducer(initiaState, undoLastInputAction()).displayInput).toEqual(['1']);
        });

        it("should remove the last character in a number greater than or equal to 10", () => {
            const initialState = { displayInput: ['12'] };
            expect(displayReducer(initialState, undoLastInputAction()).displayInput).toEqual(['1'])
        })
    });

    describe('clearDisplay', () => {
        it("should replace display with an empty array", () => {
            const initialState = { displayInput: ['2', '+', '2'] };
            expect(displayReducer(initialState, clearDisplayAction()).displayInput).toEqual([]);
        });
    });
});
