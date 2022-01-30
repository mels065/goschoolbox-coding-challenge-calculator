import { useStore } from 'react-redux';

import './style.css';

function CalculatorDisplay() {
    const store = useStore();
    const { display: { displayInput } } = store.getState();
    return (
        <div className="calculator-display">
            {displayInput.join('')}
        </div>
    )
}

export default CalculatorDisplay;
