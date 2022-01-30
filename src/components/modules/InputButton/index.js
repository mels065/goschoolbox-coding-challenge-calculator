import { useStore } from 'react-redux';

import { appendToDisplayAction } from '../../../store/display/actions';

import './style.css';

function InputButton({ val }) {
    const store = useStore();

    function clickHandler(event) {
        const input = event.target.value;
        store.dispatch(appendToDisplayAction(input));
    }

    return (
        <button value={val} onClick={clickHandler}>
            {val}
        </button>
    )
}

export default InputButton;
