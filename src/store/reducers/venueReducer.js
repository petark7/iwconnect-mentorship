const initialState = {
	venues: [],
	loading: false,
	error: null
};

const venueReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_VENUES_SUCCESS': {
			return {
				...state,
				venues: action.payload,
				loading: false,
				error: null
			};
		}

		case 'FETCH_VENUES_FAILURE': {
			return {
				...state,
				venues: [],
				loading: false,
				error: action.payload
			};
		}

		case 'FETCH_VENUES_FROM_STORE': {
			return {
				...state,
				loading: false,
				error: null
			};
		}

		default: {
			return state;
		}
	}
};

export default venueReducer;
