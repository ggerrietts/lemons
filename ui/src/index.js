import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import App from './App'; // trace this for routes when we have them

//import routes from './routes';
import { createStoreFromState } from './store';

import './index.css';

const store = createStoreFromState({}, window.devToolsExtension)
// const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('root')
);
