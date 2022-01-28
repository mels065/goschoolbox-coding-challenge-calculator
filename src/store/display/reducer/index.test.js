import displayReducer from '../reducer';
import {
    appendToDisplayAction,
    clearDisplayAction,
    undoLastInputAction
} from '../actions';

describe('displayReducer', () => {
    describe('appendToDisplay', () => {
        it("should append to existing display", () => {
            expect(displayReducer(undefined, appendToDisplayAction('1')).displayText)
                .toEqual("1");
            const initialState = { displayText: "1" };
            expect(displayReducer(initialState, appendToDisplayAction('+')).displayText)
                .toEqual("1+");
        });

        it("should not be able to append '*', '/', and '-' at the beginning of the expression", () => {
            expect(displayReducer(undefined, appendToDisplayAction('*')).displayText).toEqual('');
            expect(displayReducer(undefined, appendToDisplayAction('/')).displayText).toEqual('');
            expect(displayReducer(undefined, appendToDisplayAction('^')).displayText).toEqual('');
        })

        it("should not be able to append '*', '/', or '/' to any arithmetic operator", () => {
            let multDivExpSymbols = ['*', '/', '^'];
            let arithmeticSymbols = ['+', '-', ...multDivExpSymbols];

            for (let sym1 of arithmeticSymbols) {
                const initialState = { displayText: `5${sym1}` };
                for (let sym2 of multDivExpSymbols) {
                    expect(displayReducer(initialState, appendToDisplayAction(sym2)).displayText).toEqual(`5${sym1}`);
                }
            }
        })
    });

    describe('undoLastInput', () => {
        it("should remove the last character at the end of the display text", () => {
            const initiaState = { displayText: '1' };
            expect(displayReducer(initiaState, undoLastInputAction()).displayText).toEqual('');
            initiaState.displayText = '12';
            expect(displayReducer(initiaState, undoLastInputAction()).displayText).toEqual('1');
        });
    });

    describe('clearDisplay', () => {
        it("should replace display text with an empty string", () => {
            const initialState = { displayText: '2 + 2' };
            expect(displayReducer(initialState, clearDisplayAction()).displayText).toEqual('');
        })
    })
});