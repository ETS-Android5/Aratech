import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//import the root reducer

//initial state
const initialState = {};

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);

export default store;
