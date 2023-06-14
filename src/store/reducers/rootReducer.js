import { combineReducers } from 'redux';
import userReducer from './userReducer';
import venueReducer from './venueReducer';

const rootReducer = combineReducers({
	user: userReducer,
	venue: venueReducer
});

export default rootReducer;
