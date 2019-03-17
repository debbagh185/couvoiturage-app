import React from 'react';
import MainComponent from './MainComponent';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import thunkMiddleware from 'redux-thunk';

const store=createStore(userReducer, applyMiddleware(thunkMiddleware));

export default class App extends React.Component {
  render() {
    return (  
      <Provider store={store}>
        <MainComponent />
      </Provider>   
      
    );
  }
}

