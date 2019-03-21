import {createStore, applyMiddleware } from 'redux';
import userReducer from '../reducers/userReducer';
import thunkMiddleware from 'redux-thunk';

export default store=createStore(userReducer, applyMiddleware(thunkMiddleware));