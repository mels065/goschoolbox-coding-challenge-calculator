import { Provider } from 'react-redux';

import Calculator from '../modules/Calculator';

import store from '../../store';

import './style.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Calculator />
      </div>
    </Provider>
  );
}

export default App;
