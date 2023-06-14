const initialState = {
	users: [],
	loading: false,
	error: null
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_USERS_SUCCESS': {
			return {
				...state,
				users: action.payload,
				loading: false,
				error: null
			};
		}

		case 'FETCH_USERS_FAILURE': {
			return {
				...state,
				users: [],
				loading: false,
				error: action.payload
			};
		}

		case 'FETCH_USERS_FROM_STORE': {
			return {
				...state,
				loading: false,
				error: null
			};
		}

		case 'UPDATE_USER': {
			const updatedUser = action.payload;
			const updatedUsers = state.users.map(user => {
				if (user.id === updatedUser.id) {
					return {
						...user,
						...updatedUser
					};
				}

				return user;
			});
			return {
				...state,
				users: updatedUsers
			};
		}

		case 'DELETE_USER': {
			const userID = action.payload.id;
			const updatedUsers = state.users.filter(user => user.id !== userID);
			return {
				...state,
				users: updatedUsers
			};
		}

		default: {
			return state;
		}
	}
};

export default userReducer;
