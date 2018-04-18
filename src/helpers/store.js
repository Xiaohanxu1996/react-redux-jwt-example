import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import alertReducer from '../components/Alert/reducer';
import { authReducer, userReducer } from '../components/LogInOut/reducer';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  alertReducer,
});
const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

export default store;
