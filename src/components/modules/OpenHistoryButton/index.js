import './style.css';

import { useDispatch } from 'react-redux';

import { toggleHistoryModalAction } from '../../../store/calcHistory/actions';

function OpenHistoryButton() {
    const dispatch = useDispatch();

    function clickHandler() {
        dispatch(toggleHistoryModalAction());
    }

    return (
        <button className="btn func-btn history-btn" onClick={clickHandler}>Hist</button>
    );
}

export default OpenHistoryButton;
