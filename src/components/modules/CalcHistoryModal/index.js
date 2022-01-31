import { useSelector, useDispatch } from 'react-redux';

import { toggleHistoryModalAction } from '../../../store/calcHistory/actions'

import './style.css';

function CalcHistoryModal() {
    const { currentCalcHistory, showHistoryModal } = useSelector(state => state.calcHistory);
    const dispatch = useDispatch();

    function closeButtonClickHandler() {
        dispatch(toggleHistoryModalAction());
    }

    if (!showHistoryModal) {
        return null;
    }

    return (
        <aside className="calc-history-modal">
            <header>
                <div>
                    <h1>Calculator History</h1>
                </div>
                <div className="right">
                    <button className="modal-close-btn" onClick={closeButtonClickHandler}>&#10060;</button>
                </div>
            </header>
            {
                currentCalcHistory.length > 0 ? (
                    <ul className="entries">
                        {
                            currentCalcHistory.map((expression, i) => (
                                <li 
                                    key={`${expression}:${i}`}
                                    className="calc-history-entry"
                                >
                                    {expression.join('')}
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <p className="no-history-msg">Nothing in history yet</p>
                )
            }
        </aside>
    );
}

export default CalcHistoryModal;