import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const composedEnhancer = compose(
	applyMiddleware(thunk),
	(window.REDUX_DEVTOOLS_EXTENSION || compose)
	&& window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(rootReducer, composedEnhancer);

export default store;
