import displayReducer from '../reducer';
import { appendToDisplayAction } from '../actions';

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
});