import * as actionTypes from '../../constants/actionTypes';

export const setUserRole = role => ({
	type: actionTypes.SET_USER_ROLE,
	payload: role
});
