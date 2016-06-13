import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { routingSelector } from './selectors';
import * as reducers from './reducers';

import MainDashboard from './components/MainDashboard';

const store = createStore(combineReducers(reducers), {}, window.devToolsExtension ? window.devToolsExtension() : f => f);

const history = syncHistoryWithStore(browserHistory, store, {selectLocationState: routingSelector});

function run() {
    render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={MainDashboard}>
                </Route>
            </Router>
        </Provider>, 
        document.getElementById('app'));
}

if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}


