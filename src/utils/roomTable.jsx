import Button from 'react-bootstrap/Button';

export const getRows = (room, setModal) => {
	const actions = [
		<Button
			key="editRoom"
			className="venueDetails-editRoomBtn"
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

		room.available ? (
			<Button
				key="reserveRoom"
				className="venueDetails-reserveRoomBtn"
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
			</Button>
		)
			: (
				<Button
					key="reserveRoom"
					disabled
					className="venueDetails-reserveRoomBtn"
					variant="success"
				>
					Reserve room
				</Button>
			),

		<Button
			key="deleteRoom"
			className="venueDetails-deleteRoomBtn"
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
