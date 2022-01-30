import { useDispatch } from 'react-redux';
import { clearDisplayAction } from '../../../store/display/actions';

import './style.css';

function ClearButton() {
    const dispatch = useDispatch();

    function clickHandler() {
        dispatch(clearDisplayAction());
    }

    return (
        <button className="btn destroy-btn clear-btn" onClick={clickHandler}>C</button>
    )
}

export default ClearButton;
