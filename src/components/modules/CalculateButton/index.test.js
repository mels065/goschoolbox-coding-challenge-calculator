import reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import CalculateButton from './index';

jest.mock('react-redux', () => jest.fn());
reactRedux.useDispatch = jest.fn();
reactRedux.useSelector = jest.fn();

jest.mock('../../../store/display/actions', () => ({
    calculateAction: () => 1
}));
jest.mock('../../../store/calcHistory/actions', () => ({
    addEntryAction: () => 2
}));

describe("<CalculateButton />", () => {
    it("should render", () => {
        render(<CalculateButton />);
        expect(screen.getByText('=')).toBeInTheDocument();
    });

    it("dispatches the calculate action when clicked", () => {
        const displayInput = ['1', '+', '2'];
        reactRedux.useSelector.mockReturnValue(displayInput);

        const dispatch = jest.fn(() => {
            for (let i = 0; i < 2; i++) {
                displayInput.pop();
            }
            displayInput[0] = '3';
        });
        reactRedux.useDispatch.mockReturnValue(dispatch);

        render(<CalculateButton />);
        fireEvent.click(screen.getByText('='));
        expect(dispatch).toBeCalledWith(1);
    });

    it("dispatches the add entry to history action when clicked", () => {
        let displayInput = ['1', '+', '2'];
        reactRedux.useSelector.mockReturnValue(displayInput);
        
        let dispatch = jest.fn();
        reactRedux.useDispatch.mockReturnValue(dispatch);

        render(<CalculateButton />);
        
        fireEvent.click(screen.getByText('='));
        expect(dispatch).toBeCalledWith(2);
    });
});
