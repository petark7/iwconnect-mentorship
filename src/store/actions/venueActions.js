import { ActionTypes } from '../../constants/actionTypes';
import { getCollection, updateDocument, deleteVenue as deleteVenueFirebase } from '../../utils/firebaseUtils';

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

export const updateVenue = (venueId, updatedData) => dispatch => {
	// Update venue from DB and Redux Store
	dispatch({ type: ActionTypes.UPDATE_VENUE, payload: { id: venueId, ...updatedData } });
	updateDocument('venues', venueId, updatedData);
};

export const deleteVenue = venueId => dispatch => {
	// Delete venue from DB and Redux Store
	deleteVenueFirebase(venueId);
	dispatch({ type: ActionTypes.DELETE_VENUE, payload: { id: venueId } });
};

export const updateRoom = (roomID, updatedFields) => dispatch => {
	// Delete venue from DB and Redux Store
	dispatch({ type: ActionTypes.UPDATE_ROOM, payload: { id: roomID, updatedFields } });
	// DeleteRoomFirebase(venueId);
};
