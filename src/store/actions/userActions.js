const SET_USER_ROLE = 'SET_USER_ROLE';

export const setUserRole = role => ({
	type: SET_USER_ROLE,
	payload: role
});
