import reactRedux from 'react-redux';
import { render, screen } from '@testing-library/react'

import CalculatorDisplay from './index';

jest.mock('react-redux', () => jest.fn());
reactRedux.useStore = jest.fn();

describe('<CalculatorDisplay />', () => {
    it('should display the state of the displayInput', () => {
        const store = {
            getState: () => ({
                display: {
                    displayInput: ['1', '+', '2']
                }
            })
        };
        reactRedux.useStore.mockReturnValue(store);
        
        console.log(reactRedux)

        render(<CalculatorDisplay />);
        expect(screen.getByText('1+2')).toBeInTheDocument();
    });
});
