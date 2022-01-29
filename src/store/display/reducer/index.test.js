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
            const { displayInput: displayInput1 } = displayReducer(undefined, appendToDisplayAction('1'));
            expect(displayInput1).toEqual(["1"]);

            const initialState = { displayInput: ['1'] };
            const { displayInput: displayInput2 } = displayReducer(initialState, appendToDisplayAction('+'))
            expect(displayInput2).toEqual(["1", "+"]);
        });

        it("should be appended to last entry if previous and current entries are numbers", () => {
            const initialState = { displayInput: ['1'] };
            const { displayInput } = displayReducer(initialState, appendToDisplayAction('2'));
            expect(displayInput).toEqual(['12']);
        });

        it("should be appended to last entry if previous entry entry is a number, and current entry is a decimal point", () => {
            const initialState = { displayInput: ['1'] };
            const { displayInput } = displayReducer(initialState, appendToDisplayAction('.'))
            expect(displayInput).toEqual(['1.']);
        });

        it("should append to last entry if previous entry is a decimal point and current is a number", () => {
            const initialState = { displayInput: ['1.'] };
            const { displayInput } = displayReducer(initialState, appendToDisplayAction('2'));
            expect(displayInput).toEqual(['1.2']);
        });

        it("should not append a decimal point to a decimal point", () => {
            const initialState = { displayInput: ['1.'] };
            const { displayInput } = displayReducer(initialState, appendToDisplayAction('.'));
            expect(displayInput).toEqual(['1.']);
        })

        it("should append 0 to an unfinished decimal place if an operator is entered", () => {
            const initialState = { displayInput: ['1.'] };
            const operators = ['+', '-', '*', '/', '^'];
            for (let operator of operators) {
                const { displayInput } = displayReducer(initialState, appendToDisplayAction(operator));
                expect(displayInput).toEqual(['1.0', operator]);
            }
        });

        it("should add 0 to the beginning of a decimal point if it is the first entry", () => {
            const { displayInput } = displayReducer(undefined, appendToDisplayAction('.'));
            expect(displayInput).toEqual(['0.']);
        });

        it("should add 0 the beginning of a decimal point if it is added after an operator", () => {
            const operators = ['+', '-', '*', '/', '^'];
            for (let operator of operators) {
                const initialState = { displayInput: ['1', operator] };
                const { displayInput } = displayReducer(initialState, appendToDisplayAction('.'));
                expect(displayInput).toEqual(['1', operator, '0.']);
            }
        })

        it("should not be able to append '*', '/', and '^' at the beginning of the expression", () => {
            const operators = ['*', '/', '^'];
            for (let operator of operators) {
                const { displayInput } = displayReducer(undefined, appendToDisplayAction(operator));
                expect(displayInput).toEqual([]);    
            }
        });

        it("should not be able to append '*', '/', or '/' to any arithmetic operator", () => {
            let multDivExpSymbols = ['*', '/', '^'];
            let arithmeticSymbols = ['+', '-', ...multDivExpSymbols];

            for (let sym1 of arithmeticSymbols) {
                const initialState = { displayInput: ['5', sym1] };
                for (let sym2 of multDivExpSymbols) {
                    const { displayInput } = displayReducer(initialState, appendToDisplayAction(sym2));
                    expect(displayInput).toEqual(['5', sym1]);
                }
            }
        });
    });

    describe('undoLastInput', () => {
        it("should remove the last input at the end of the display", () => {
            const initiaState = { displayInput: ['1'] };
            const { displayInput: displayInput1 } = displayReducer(initiaState, undoLastInputAction())
            expect(displayInput1).toEqual([]);

            initiaState.displayInput = ['1', '+'];
            const { displayInput: displayInput2 } = displayReducer(initiaState, undoLastInputAction());
            expect(displayInput2).toEqual(['1']);
        });

        it("should remove the last character in a number greater than or equal to 10", () => {
            const initialState = { displayInput: ['12'] };
            const { displayInput } = displayReducer(initialState, undoLastInputAction());
            expect(displayInput).toEqual(['1'])
        });

        it("should remove a decimal point in last entry if it's the last character", () => {
            const initialState = { displayInput: ['1.'] };
            const { displayInput } = displayReducer(initialState, undoLastInputAction());
            expect(displayInput).toEqual(['1']);
        })
    });

    describe('clearDisplay', () => {
        it("should replace display with an empty array", () => {
            const initialState = { displayInput: ['2', '+', '2'] };
            const { displayInput } = displayReducer(initialState, clearDisplayAction());
            expect(displayInput).toEqual([]);
        });
    });
});
