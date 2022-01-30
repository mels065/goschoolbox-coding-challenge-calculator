import { useSelector } from 'react-redux';

import './style.css';

function CalculatorDisplay() {
    const displayInput = useSelector(state => state.display.displayInput);
    return (
        <div className="calculator-display">
            {displayInput.join('')}
        </div>
    )
}

export default CalculatorDisplay;
