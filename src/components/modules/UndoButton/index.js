import { useDispatch } from 'react-redux';

import { undoLastInputAction } from '../../../store/display/actions';

import './style.css'

function UndoButton() {
    const dispatch = useDispatch();

    function clickHandler() {
        dispatch(undoLastInputAction());
    }

    return (
        <button className="btn destroy-btn" onClick={clickHandler}>&larr;</button>
    )
}

export default UndoButton;
