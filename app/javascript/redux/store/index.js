import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combineReducers from '../reducers/index';
import initialState from './initialState';

const middleware = applyMiddleware(thunk);

const store = createStore(
    combineReducers,
    initialState,
    composeWithDevTools(middleware)
);

export default store;