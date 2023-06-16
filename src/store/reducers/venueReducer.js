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

		case 'DELETE_VENUE': {
			const venueID = action.payload.id;
			const updatedVenues = state.venues.filter(venue => venue.id !== venueID);
			return {
				...state,
				venues: updatedVenues
			};
		}

		case 'UPDATE_VENUE': {
			const updatedVenue = action.payload;
			const updatedVenues = state.venues.map(venue => {
				if (venue.id === updatedVenue.id) {
					return {
						...venue,
						...updatedVenue
					};
				}

				return venue;
			});
			return {
				...state,
				venues: updatedVenues
			};
		}

		default: {
			return state;
		}
	}
};

export default venueReducer;
