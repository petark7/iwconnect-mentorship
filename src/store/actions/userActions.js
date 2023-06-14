import { ActionTypes } from '../../constants/actionTypes';
import { updateDocument, getCollection, deleteUser as deleteUserFirebase } from '../../utils/firebaseUtils';

export const fetchUsers = () => async (dispatch, getState) => {
	const { users } = getState().user; // Get the current state from the Redux store

	if (users.length === 0) {
		// If the venues array in the state is empty, fetch data from the API
		try {
			const data = await getCollection('users');
			dispatch({ type: ActionTypes.FETCH_USERS_SUCCESS, payload: data });
		} catch (error) {
			console.log(error);
			dispatch({ type: ActionTypes.FETCH_USERS_FAILURE, payload: error.message });
		}
	} else {
		// If the venues array in the state is already populated, use the data from the store
		dispatch({ type: ActionTypes.FETCH_USERS_FROM_STORE });
	}
};

export const updateUser = (userId, updatedData) => dispatch => {
	// Dispatch an action to update the Redux store with the edited data
	dispatch({ type: ActionTypes.UPDATE_USER, payload: { id: userId, ...updatedData } });
	updateDocument('users', userId, updatedData);
};

export const deleteUser = userId => dispatch => {
	// Dispatch an action to delete user from Redux store with the edited data
	dispatch({ type: ActionTypes.DELETE_USER, payload: { id: userId } });
	deleteUserFirebase(userId);
};
