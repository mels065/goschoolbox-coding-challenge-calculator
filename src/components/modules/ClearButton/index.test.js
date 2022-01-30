import reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import ClearButton from './index';

jest.mock('react-redux', () => jest.fn());
reactRedux.useDispatch = jest.fn();

jest.mock('../../../store/display/actions', () => ({
    clearDisplayAction: () => true
}))

describe("<ClearButton />", () => {
    it("should render", () => {
        render(<ClearButton />);
        expect(screen.getByText('C')).toBeInTheDocument();
    });

    it("dispatches clear display action when clicked", () => {
        const dispatch = jest.fn();
        reactRedux.useDispatch.mockReturnValue(dispatch);

        render(<ClearButton />);
        fireEvent.click(screen.getByText('C'));
        expect(dispatch).toHaveBeenCalledWith(true);
    })
})
