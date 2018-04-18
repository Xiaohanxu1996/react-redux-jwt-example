import logInOutActionTypes from './actionTypes';
import alertActions from '../Alert/action';
import { history, authHeader } from '../../helpers';


function handleResponse(response) {
  if (response.statusCode !== 200) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}


// Authentication Actions
function logIn(username, password) {
  function request(user) {
    return { type: logInOutActionTypes.LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: logInOutActionTypes.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: logInOutActionTypes.LOGIN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ username }));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    fetch('/users/authenticate', requestOptions)
      .then(handleResponse)
      .then((user) => {
        // check whether a token is sended back
        if (user && user.token) {
          // store the jwt token in localStorage
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      .then((user) => {
        dispatch(success(user));
        history.push('/');
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      });
  };
}

function logOut() {
  localStorage.removeItem('user');
  return { type: logInOutActionTypes.LOGOUT };
}

// User Action
function getAll() {
  function request() {
    return { type: logInOutActionTypes.GETALL_REQUEST };
  }

  function success(users) {
    return { type: logInOutActionTypes.GETALL_SUCCESS, users };
  }

  function failure(error) {
    return { type: logInOutActionTypes.GETALL_FAILURE, error };
  }

  return (dispatch) => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
    };
    dispatch(request());
    fetch('/users', requestOptions)
      .then(handleResponse)
      .then(
        (users) => {
          dispatch(success(users));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

const logInOutActions = {
  logIn,
  logOut,
  getAll,
};

export default logInOutActions;
