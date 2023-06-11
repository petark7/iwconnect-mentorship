const initialState = {
	users: []
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'STORE_USERS': {
			return {
				...state,
				users: action.payload };
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

		default: {
			return state;
		}
	}
};

export default userReducer;

