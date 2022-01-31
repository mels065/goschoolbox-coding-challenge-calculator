import { useSelector, useDispatch } from 'react-redux';

import { calculateAction } from '../../../store/display/actions';
import { addEntryAction } from '../../../store/calcHistory/actions';

import './style.css';

function CalculateButton() {
    const displayInput = useSelector(state => state.display.displayInput);
    const dispatch = useDispatch();

    function clickHandler() {
        const expressionBeforeCalculation = [...displayInput];
        dispatch(calculateAction());
        // if (displayInput.length === 1 && expressionBeforeCalculation.length > 1) {
        dispatch(addEntryAction(expressionBeforeCalculation));
        // }
    }
    return (
        <button className="btn func-btn calculate-btn" onClick={clickHandler}>=</button>
    );
}

export default CalculateButton;
