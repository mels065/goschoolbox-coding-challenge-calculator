import reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import InputButton from './index';

jest.mock('react-redux', () => jest.fn())
reactRedux.useStore = jest.fn();

describe('<InputButton />', () => {
    it('has its value displayed', () => {
        render(<InputButton val={'1'} />);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('dispatches append to display action when clicked', () => {
        const store = {
            dispatch: jest.fn()
        };
        reactRedux.useStore.mockReturnValue(store);

        render(<InputButton val={'1'} />);
        fireEvent.click(screen.getByText('1'));
        expect(store.dispatch).toBeCalledWith({
            type: 'APPEND_TO_DISPLAY',
            payload: '1'
        });
    })
});
