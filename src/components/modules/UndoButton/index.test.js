import reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import UndoButton from './index';

jest.mock('react-redux', () => jest.fn());
reactRedux.useDispatch = jest.fn();

jest.mock('../../../store/display/actions', () => ({
    undoLastInputAction: () => true
}));

describe("<UndoButton />", () => {
    it("should render", () => {
        render(<UndoButton />);
        expect(screen.getByText('←')).toBeInTheDocument();
    });

    it("dispatches undo last entry action when clicked", () => {
        const dispatch = jest.fn();
        reactRedux.useDispatch.mockReturnValue(dispatch);

        render(<UndoButton />);
        fireEvent.click(screen.getByText('←'));
        expect(dispatch).toHaveBeenCalledWith(true);
    })
});
