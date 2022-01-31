import { Provider } from 'react-redux';

import Calculator from '../modules/Calculator';
import CalcHistoryModal from '../modules/CalcHistoryModal';

import store from '../../store';

import './style.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Calculator />
        <CalcHistoryModal />
      </div>
    </Provider>
  );
}

export default App;
