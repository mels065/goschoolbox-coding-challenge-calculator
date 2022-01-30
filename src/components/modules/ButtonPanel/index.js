import InputButton from '../InputButton';
import UndoButton from '../UndoButton';
import ClearButton from '../ClearButton';
import CalculateButton from '../CalculateButton';

import './style.css';

function ButtonPanel() {
    return (
        <div className="btn-panel">
            <div className="val-btn-panel-1">
                {
                    new Array(9).fill(null).map((__, i) => String(i+1))
                        .map(num => (
                            <InputButton key={`sym-${num}`} val={num} />
                        ))
                }
                <InputButton val={'0'} />
                <InputButton val={'('} />
                <InputButton val={')'} />
            </div>
            <div className="val-btn-panel-2">
                <InputButton val={'.'} />
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
                <ClearButton />
            </div>
            <div className="func-btn-panel">
                <CalculateButton />
            </div>
        </div>
    );
}

export default ButtonPanel;
