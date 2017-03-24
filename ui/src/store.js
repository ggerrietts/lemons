import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as formReducer } from 'redux-form';
import { weatherReducer } from './modules/weather';
import { ledgerReducer } from './modules/ledger';
import { authReducer, authWatcher } from './modules/auth';

const sagaMiddleware = createSagaMiddleware()
export const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

function* rootSaga() {
  yield [
    authWatcher()
  ]
}

const RootReducer = combineReducers({
  ledger: ledgerReducer,
  weather: weatherReducer,
  form: formReducer,
  auth: authReducer
});

export function createStoreFromState(initialState = {}, devtools = undefined) {
  const store = createStoreWithMiddleware(RootReducer, initialState, devtools ? devtools() : f => f);
  sagaMiddleware.run(rootSaga);
  return store;
}

