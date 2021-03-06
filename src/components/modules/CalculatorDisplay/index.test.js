import reactRedux from 'react-redux';
import { render, screen } from '@testing-library/react'

import CalculatorDisplay from './index';

jest.mock('react-redux', () => jest.fn());
reactRedux.useSelector = jest.fn();

describe('<CalculatorDisplay />', () => {
    it('should display the state of the displayInput', () => {
        reactRedux.useSelector.mockReturnValue(['1', '+', '2']);

        render(<CalculatorDisplay />);
        expect(screen.getByText('1+2')).toBeInTheDocument();
    });
});
