import reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import CalculateButton from './index';

jest.mock('react-redux', () => jest.fn());
reactRedux.useDispatch = jest.fn();

jest.mock('../../../store/display/actions', () => ({
    calculateAction: () => true
}));

describe("<CalculateButton />", () => {
    it("should render", () => {
        render(<CalculateButton />);
        expect(screen.getByText('=')).toBeInTheDocument();
    });

    it("dispatches the calculate action when clicked", () => {
        const dispatch = jest.fn();
        reactRedux.useDispatch.mockReturnValue(dispatch);

        render(<CalculateButton />);
        fireEvent.click(screen.getByText('='));
        expect(dispatch).toBeCalledWith(true);
    });
});
