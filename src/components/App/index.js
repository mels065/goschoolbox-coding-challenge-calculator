import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Calculator from '../modules/Calculator';
import CalcHistoryModal from '../modules/CalcHistoryModal';

import { retrieveCalcHistoryAction } from '../../store/calcHistory/actions';

import './style.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveCalcHistoryAction());
  }, [dispatch]);

  return (
    <div className="App">
      <Calculator />
      <CalcHistoryModal />
    </div>
  );
}

export default App;
