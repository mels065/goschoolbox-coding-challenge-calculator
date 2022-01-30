import InputButton from '../InputButton';
import UndoButton from '../UndoButton';

import './style.css';

function ButtonPanel() {
    return (
        <div className="btn-panel">
            <div className="num-btn-panel">
                {
                    new Array(9).fill(null).map((__, i) => String(i+1))
                        .map(num => (
                            <InputButton key={`sym-${num}`} val={num} />
                        ))
                }
            </div>
            <div className="zero-btn-panel">
                <InputButton val={'0'} />
            </div>
            <div className="arithmetic-btn-panel">
                {
                    ['+', '-', '/', '*', '^'].map(sym => (
                        <InputButton key={`sym-${sym}`} val={sym} />
                    ))
                }
            </div>
            <div className="destroy-btn-panel">
                <UndoButton />
            </div>
        </div>
    );
}

export default ButtonPanel;
