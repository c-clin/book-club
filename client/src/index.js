import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// testing purposes
import axios from 'axios';
window.axios = axios;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
