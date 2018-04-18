import logInOutActionTypes from './actionTypes';

const user = JSON.parse(localStorage.getItem('item'));
const initialState = user ? { loggedIn: true, user } : {};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case logInOutActionTypes.LOGIN_REQUEST: {
      return {
        loggedIn: true,
        user: action.user,
      };
    }
    case logInOutActionTypes.LOGIN_SUCCESS: {
      return {
        loggedIn: true,
        user: action.user,
      };
    }
    case logInOutActionTypes.LOGIN_FAILURE: {
      return {};
    }
    case logInOutActionTypes.LOGOUT: {
      return {};
    }
    default: {
      return state;
    }
  }
}

function userReducer(state = {}, action) {
  switch (action.type) {
    case logInOutActionTypes.GETALL_REQUEST: {
      return {
        loding: true,
      };
    }
    case logInOutActionTypes.GETALL_SUCCESS: {
      return {
        users: action.users,
      };
    }
    case logInOutActionTypes.GETALL_FAILURE: {
      return {
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}

export { authReducer, userReducer };
