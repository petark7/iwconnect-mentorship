
import { combineReducers } from 'redux';
import authReducer from './authReducer';
// Import your individual reducers here
// For example:
// import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
  // Add your individual reducers here
  // For example:
  // auth: authReducer,
});

export default rootReducer;