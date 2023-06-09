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

		default: {
			return state;
		}
	}
};

export default userReducer;

