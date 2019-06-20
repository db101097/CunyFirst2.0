import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { user, getClasses, getSchedule } from '../reducers';

const rootReducer = combineReducers({ user, getClasses, getSchedule });

const logger = createLogger({collapsed: true});
const middleWare = composeWithDevTools(applyMiddleware(thunkMiddleware, logger));
const store = createStore(rootReducer, middleWare);

export default store;
