import './style.css';

import CalculatorDisplay from '../CalculatorDisplay';
import ButtonPanel from '../ButtonPanel';

function Calculator() {
    return (
        <div className="calculator">
            <CalculatorDisplay />
            <ButtonPanel />
        </div>
    );
}

export default Calculator;
