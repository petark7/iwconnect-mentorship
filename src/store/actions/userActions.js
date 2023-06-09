import { ActionTypes } from '../../constants/actionTypes';

export const storeUsers = users => ({
	type: ActionTypes.STORE_USERS,
	payload: users
});
