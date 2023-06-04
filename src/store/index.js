import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

const composedEnhancer = compose(
	applyMiddleware(thunk),
	(window.__REDUX_DEVTOOLS_EXTENSION__) && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(userReducer, composedEnhancer);

export default store;
