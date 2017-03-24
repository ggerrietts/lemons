import _ from 'lodash';
import { put, call, take } from 'redux-saga/effects';

import { post } from '../utils/xhr';

const INITIAL_STATE = {
  user: null,
  isLoading: false
};

// action types
const LOGIN = "auth/LOGIN";
const SIGNUP = "auth/SIGNUP";

// one success and one failure for both
const AUTH_SUCCESS = "auth/AUTH_SUCCESS";

const LOGOUT = "auth/LOGOUT";

// action creators
export const login = (email, password) => { return { type: LOGIN, email, password } };
export const signup = (email, name, password) => { return { type: SIGNUP, email, name, password } };

const authSuccess = (user) => { return { type: AUTH_SUCCESS, user } };
const logout = () => { return { type: LOGOUT } };


// reducer
export const authReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
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
    console.log("gonna try with this payload:");
    console.log(payload);
    const success = yield post('/v1/login', payload);
    yield put(authSuccess(success));
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

// signup doesn't log you in today so should fix that
function* signupWorker(action) {
  const payload = {
    email: action.email,
    name: action.name,
    password: action.password
  };
  try {
    const success = yield post('/v1/user', payload);
    yield put(authSuccess(success));
  }
  catch (e) {
    yield put(logout());
  }
}

function* signupWatcher() {
  while (true) {
    const action = yield take(SIGNUP)
    yield call(signupWorker, action);
  }
}


export function* authWatcher() {
  yield [loginWatcher(), signupWatcher()];
}

// selectors

export const isLoading = (state) => state.auth.isLoading;
export const isAuthenticated = (state) => state.auth.user !== null;


