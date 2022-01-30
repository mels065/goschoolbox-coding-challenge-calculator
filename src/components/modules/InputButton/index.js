import { useDispatch } from 'react-redux';

import { appendToDisplayAction } from '../../../store/display/actions';

import './style.css';

function InputButton({ val }) {
    const dispatch = useDispatch();

    function clickHandler(event) {
        const input = event.target.value;
        dispatch(appendToDisplayAction(input));
    }

    return (
        <button className="btn input-btn" value={val} onClick={clickHandler}>
            {val}
        </button>
    )
}

export default InputButton;
