import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// Import Reducers
import loginReducer from './Reducers/00-login-reducer'
import todoReducer from './Reducers/01-todo-redcuer'

// combined reducers
const rootReducer = combineReducers({
  loginReducer,
  todoReducer,
  });


// create logger for thunk
const logger = (store) => {
    return (next) => {
      return (action) => {
        const result = next(action);
        return result;
      };
    };
  };

// Adding the redux devtools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// create store - redux
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk))
  );



const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
