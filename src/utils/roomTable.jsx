import Button from 'react-bootstrap/Button';

export const getRows = (room, setModal) => {
	const actions = [
		<Button
			key="editRoom"
			className="venueDetails-editRoomBtn mb-1 mt-1"
			variant="primary"
			onClick={event => {
				event.stopPropagation();
				setModal(previousValue => (
					{
						...previousValue,
						roomID: room.id,
						modalEditVisible: true
					}
				));
			}}
		>
			Edit room
		</Button>,
		<Button
			key="reserveRoom"
			className="venueDetails-reserveRoomBtn mb-1 mt-1"
			variant="success"
			onClick={event => {
				event.stopPropagation();
				setModal(previousValue => (
					{
						...previousValue,
						roomID: room.id,
						modalReserveVisible: true
					}
				));
			}}
		>
			Reserve room
		</Button>,

		<Button
			key="deleteRoom"
			className="venueDetails-deleteRoomBtn mb-1 mt-1"
			variant="danger"
			onClick={event => {
				event.stopPropagation();
				setModal(previousValue => (
					{
						...previousValue,
						roomID: room.id,
						modalDeleteVisible: true
					}
				));
			}}
		>
			Delete room
		</Button>
	];

	return 	({
		id: room.id,
		name: room.name,
		available: (room.available ? 'Available' : 'Reserved'),
		actions
	});
};

export const getUserID = (users, email) => {
	const user = users.find(user => user.email === email);
	if (user) {
		return user.id;
	}

	return null;
};

// Due to CEST -> UTC conversion, date formatting is needed
export const getFormattedDate = date => {
	const CESTDate = new Date();
	CESTDate.setDate(date.getDate());
	return CESTDate.toISOString().split('T')[0];
};
