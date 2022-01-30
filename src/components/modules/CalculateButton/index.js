import { useDispatch } from 'react-redux';

import { calculateAction } from '../../../store/display/actions';

import './style.css';

function CalculateButton() {
    const dispatch = useDispatch();

    function clickHandler() {
        dispatch(calculateAction())
    }
    return (
        <button className="btn func-btn calculate-btn" onClick={clickHandler}>=</button>
    );
}

export default CalculateButton;
