import alertActionTypes from './actionTypes';

function success(message) {
  return { type: alertActionTypes.SUCCESS, message };
}

function error(message) {
  return { type: alertActionTypes.ERROR, message };
}

function clear() {
  return { type: alertActionTypes.CLEAR };
}

const alertActions = {
  success,
  error,
  clear,
};

export default alertActions;
