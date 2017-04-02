import _ from 'lodash';
import { put, call, take, select } from 'redux-saga/effects';

import { post, get } from '../utils/xhr';

const INITIAL_STATE = {
  user: null,
  isLoading: false
};

// action types
const LOGIN = "auth/LOGIN";
const CHECK_SESSION = "auth/CHECK_SESSION";

// one success and one failure for both
const AUTH_SUCCESS = "auth/AUTH_SUCCESS";

const LOGOUT = "auth/LOGOUT";

// action creators
export const login = (email, password) => { return { type: LOGIN, email, password } };
export const checkSession = () => { return { type: CHECK_SESSION } };

const authSuccess = (user) => { return { type: AUTH_SUCCESS, user } };
const logout = () => { return { type: LOGOUT } };


// reducer
export const authReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        isLoading: true,
        ...state
      };
    case AUTH_SUCCESS:
      return {
        isLoading: false,
        user: action.user
      };
    case LOGOUT:
      return {
        isLoading: false,
        user: null
      }
    default:
      return state;
  }
};

// saga

function* loginWorker(action) {
  const payload = {
    email: action.email,
    password: action.password
  };
  try {
    const success = yield post('/v1/login', payload);
    const json = yield success.json();
    yield put(authSuccess(json.user));
  }
  catch (e) {
    yield put(logout());
  }
}

function* loginWatcher() {
  while (true) {
    const action = yield take(LOGIN);
    console.log("LOGIN taken");
    yield call(loginWorker, action);
  }
}

function* checkSessionWorker() {
  try {
    const state = yield select();
    if (state.auth.authenticatedUser) {
      return
    }
    const success = yield get('/v1/login');
    const json = yield success.json();
    if (success.ok && json && json.user) {
      yield put(authSuccess(json.user));
    } else {
      yield put(logout());
    }
  }
  catch (e) {
    yield put(logout());
  }
}

function* checkSessionWatcher() {
  while (true) {
    const action = yield take(CHECK_SESSION);
    yield call(checkSessionWorker, action);
  }
}

export function *authWatcher() {
  yield [
    checkSessionWatcher(),
    loginWatcher()
  ];
}
// selectors

export const isLoading = (state) => state.auth.isLoading;
export const isAuthenticated = (state) => state.auth.user !== null;


