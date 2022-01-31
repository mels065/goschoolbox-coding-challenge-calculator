import reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import CalcHistoryModal from './index';

jest.mock('react-redux', () => jest.fn());
reactRedux.useSelector = jest.fn();
reactRedux.useDispatch = jest.fn();

jest.mock('../../../store/calcHistory/actions', () => ({
    toggleHistoryModalAction: () => true
}))

describe("<CalcHistoryModal />", () => {
    it("should render with calcHistory", () => {
        const state = {
            calcHistory: {
                currentCalcHistory: [['3', '+', '2'], ['6', '*', '4']],
                showHistoryModal: true
            }
        };
        reactRedux.useSelector.mockReturnValue(state.calcHistory);

        render(<CalcHistoryModal />);
        for (let expression of state.calcHistory.currentCalcHistory) {
            expect(screen.getByText(expression.join(''))).toBeInTheDocument();
        }
    });

    it("should hide dispatch toggle history modal when X button is clicked", () => {
        const dispatch = jest.fn();
        const state = {
            calcHistory: {
                currentCalcHistory: [],
                showHistoryModal: true
            }
        };
        reactRedux.useSelector.mockReturnValue(state.calcHistory);
        reactRedux.useDispatch.mockReturnValue(dispatch);

        render(<CalcHistoryModal />)
        fireEvent.click(screen.getByText('❌'));
        expect(dispatch).toBeCalledWith(true);
    })
});
