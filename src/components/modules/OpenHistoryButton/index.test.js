import reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import OpenHistoryButton from './index.js';

jest.mock('react-redux', () => jest.fn());
reactRedux.useDispatch = jest.fn();

jest.mock('../../../store/calcHistory/actions', () => ({
    toggleHistoryModalAction: () => true
}));

describe('<OpenHistoryButton />', () => {
    it("should dispatch a toggle history modal action when clicked", () => {
        const dispatch = jest.fn();
        reactRedux.useDispatch.mockReturnValue(dispatch);

        render(<OpenHistoryButton />);
        fireEvent.click(screen.getByText('Hist'));

        expect(dispatch).toBeCalledWith(true);
    });
});
