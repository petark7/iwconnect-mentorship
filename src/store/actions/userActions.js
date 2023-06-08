import { ActionTypes } from '../../constants/actionTypes';

export const setUserRole = role => ({
	type: ActionTypes.SET_USER_ROLE,
	payload: role
});

export const setUsers = users => ({
	type: ActionTypes.SET_USERS,
	payload: users
});
