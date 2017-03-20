import { createStore, applyMiddleware, combineReducers } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import { routerReducer } from 'react-router-redux';

// import authReducer, { authWatcher } from './modules/auth';
import { weatherReducer } from './modules/weather';
import { ledgerReducer } from './modules/ledger';

// const sagaMiddleware = createSagaMiddleware()
// export const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
export const createStoreWithMiddleware = createStore;

//function* rootSaga() {
//  yield [
//    authWatcher(),
//    createServiceWatcher()
//  ]
//}

const RootReducer = combineReducers({
  ledger: ledgerReducer,
  weather: weatherReducer
});

export function createStoreFromState(initialState = {}, devtools = undefined) {
  const store = createStoreWithMiddleware(RootReducer, initialState, devtools ? devtools() : f => f);
  // sagaMiddleware.run(rootSaga);
  return store;
}

