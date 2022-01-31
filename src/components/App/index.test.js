import reactRedux from 'react-redux';
import { render } from '@testing-library/react';

import App from './index';

jest.mock('react-redux', () => jest.fn());
reactRedux.useDispatch = jest.fn();

jest.mock('../../store/calcHistory/actions', () => ({
    retrieveCalcHistoryAction: () => true
}));

jest.mock('../modules/Calculator', () => ({
    __esModule: true,
    default: ({ val }) => {
        return <div />
    }
}));

jest.mock('../modules/CalcHistoryModal', () => ({
    __esModule: true,
    default: ({ val }) => {
        return <div />
    }
}));

describe('<App />', () => {
    it('should retrieve history from local storage and put it in store when rendered', () => {
        const dispatch = jest.fn();
        reactRedux.useDispatch.mockReturnValue(dispatch);

        render(<App />);
        expect(dispatch).toBeCalledWith(true);
    })
});
