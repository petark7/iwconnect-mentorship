import { ActionTypes } from '../../constants/actionTypes';
import { getCollection } from '../../utils/firebaseUtils';

export const fetchVenues = () => async (dispatch, getState) => {
	const { venues } = getState().venue; // Get the current state from the Redux store

	if (venues.length === 0) {
		// If the venues array in the state is empty, fetch data from the API
		try {
			const data = await getCollection('venues');
			dispatch({ type: ActionTypes.FETCH_VENUES_SUCCESS, payload: data });
		} catch (error) {
			console.log(error);
			dispatch({ type: ActionTypes.FETCH_VENUES_FAILURE, payload: error.message });
		}
	} else {
		// If the venues array in the state is already populated, use the data from the store
		dispatch({ type: ActionTypes.FETCH_VENUES_FROM_STORE });
	}
};
