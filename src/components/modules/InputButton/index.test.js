import reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import InputButton from './index';

jest.mock('react-redux', () => jest.fn())
reactRedux.useDispatch = jest.fn();

jest.mock('../../../store/display/actions', () => ({
    appendToDisplayAction: val => !!val
}))

describe('<InputButton />', () => {
    it('has its value displayed', () => {
        render(<InputButton val={'1'} />);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('dispatches append to display action when clicked', () => {
        const dispatch = jest.fn();
        reactRedux.useDispatch.mockReturnValue(dispatch);

        render(<InputButton val={'1'} />);
        fireEvent.click(screen.getByText('1'));
        expect(dispatch).toBeCalledWith(true);
    })
});
