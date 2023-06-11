import { ActionTypes } from '../../constants/actionTypes';
import { updateDocument } from '../../utils/firebaseUtils';

export const storeUsers = users => ({
	type: ActionTypes.STORE_USERS,
	payload: users
});

export const updateUser = (userId, updatedData) => dispatch => {
	// Dispatch an action to update the Redux store with the edited data
	dispatch({ type: ActionTypes.UPDATE_USER, payload: { id: userId, ...updatedData } });
	updateDocument('users', userId, updatedData);
};
