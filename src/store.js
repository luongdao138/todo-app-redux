import { createStore, compose, combineReducers } from 'redux';
import { todoReducers } from './reducers/todoReducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    todos: todoReducers,
  }),
  composeEnhancer()
);

// console.log(store.getState());
