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

        it("should prepend a '*' before an input of an open parenthesis if a number preceded it", () => {
            const initialState = { displayInput: ['3'] };
            const { displayInput }= displayReducer(initialState, appendToDisplayAction('('));
            expect(displayInput).toEqual(['3', '*', '(']);
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

    describe('calculate', () => {
        it("should return the same string if only number was entered in display", () => {
            const initialState = { displayInput: ['1282022'] };
            const { displayInput } = displayReducer(initialState, calculateAction());
            expect(displayInput).toEqual(['1282022']);
        });

        it("should do basic arithmetic", () => {
            const initialState = { displayInput: ['2', '+', '2'] };
            const { displayInput: displayInput1 } = displayReducer(initialState, calculateAction());
            expect(displayInput1).toEqual(['4']);

            initialState.displayInput = ['1', '-', '4'];
            const { displayInput: displayInput2 } = displayReducer(initialState, calculateAction());
            expect(displayInput2).toEqual(['-3']);

            initialState.displayInput = ['3', '*', '2'];
            const { displayInput: displayInput3 } = displayReducer(initialState, calculateAction());
            expect(displayInput3).toEqual(['6']);

            initialState.displayInput = ['20', '/', '4'];
            const { displayInput: displayInput4 } = displayReducer(initialState, calculateAction());
            expect(displayInput4).toEqual(['5']);

            initialState.displayInput = ['5', '^', '2'];
            const { displayInput: displayInput5 } = displayReducer(initialState, calculateAction());
            expect(displayInput5).toEqual(['25']);
        });

        it("should handle parenthesis", () => {
            const initialState = { displayInput: ['5', '*', '(', '3', '+', '4', ')'] };
            const { displayInput } = displayReducer(initialState, calculateAction());
            expect(displayInput).toEqual(['35']);
        });

        it("should handle nested parenthesis", () => {
            const initialState = { displayInput: ['5', '*', '(', '3', '+', '(', '20', '/', '(', '2', '+', '2', ')', ')', ')', '+', '4', '+', '3'] };
            const { displayInput } = displayReducer(initialState, calculateAction());
            expect(displayInput).toEqual(['47']);
        });

        it("should be able to handle decimal arithmetic", () => {
            const initialState = { displayInput: ['1.1', '+', '1.3'] };
            const { displayInput: displayInput1 } = displayReducer(initialState, calculateAction());
            expect(displayInput1).toEqual(['2.4']);

            initialState.displayInput = ['3.53', '-', '1.3'];
            const { displayInput: displayInput2 } = displayReducer(initialState, calculateAction());
            expect(displayInput2).toEqual(['2.23']);

            initialState.displayInput = ['2.1', '*', '1.5'];
            const { displayInput: displayInput3 } = displayReducer(initialState, calculateAction());
            expect(displayInput3).toEqual(['3.15']);

            initialState.displayInput = ['2.1', '/', '1.5'];
            const { displayInput: displayInput4 } = displayReducer(initialState, calculateAction());
            expect(displayInput4).toEqual(['1.4']);
        });

        it("should convert positives/negatives", () => {
            const initialState = { displayInput: ['+', '+', '1'] };
            const { displayInput: displayInput1 } = displayReducer(initialState, calculateAction());
            expect(displayInput1).toEqual(['1']);
            
            initialState.displayInput = ['-', '+', '1']
            const { displayInput: displayInput2 } = displayReducer(initialState, calculateAction());
            expect(displayInput2).toEqual(['-1']);
            
            initialState.displayInput = ['+', '-', '1']
            const { displayInput: displayInput3 } = displayReducer(initialState, calculateAction());
            expect(displayInput3).toEqual(['-1']);
            
            initialState.displayInput = ['-', '-', '1']
            const { displayInput: displayInput4 } = displayReducer(initialState, calculateAction());
            expect(displayInput4).toEqual(['1']);
        });

        it("should do nothing if no numbers and just +/-", () => {
            const initialState = { displayInput: ['+', '-'] };
            const { displayInput } = displayReducer(initialState, calculateAction());
            expect(displayInput).toEqual(['+', '-']);
        });

        it("should do nothing if an operation was not finished correctly", () => {
            const initialState = { displayInput: ['1', '+', '2', '*'] };
            const { displayInput } = displayReducer(initialState, calculateAction());
            expect(displayInput).toEqual(['1', '+', '2', '*']);
        })

        it("should return 0 if no input is provided", () => {
            const { displayInput } = displayReducer(undefined, calculateAction());
            expect(displayInput).toEqual(['0']);
        });

        it("should obey order of operations", () => {
            const initialState = { displayInput: ['(', '3', '*', '4', ')', '+', '(', '-', '10', '/', '2', ')', '^', '2', '-', '3'] };
            const { displayInput: displayInput1 } = displayReducer(initialState, calculateAction());
            expect(displayInput1).toEqual(['34']);

            initialState.displayInput = ['(', '3', '*', '(', '1', '+', '3', ')', ')', '+', '(', '-', '10', '/', '2', ')', '^', '2', '-', '3'];
            const { displayInput: displayInput2 } = displayReducer(initialState, calculateAction());
            expect(displayInput2).toEqual(['34']);
        });
    });
});
