import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const enhancer = process.env.NODE_ENV === 'dev'
	? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)
	: compose;

const composeEnhancers = enhancer(applyMiddleware(thunk));

const store = createStore(rootReducer, composeEnhancers);

export default store;
