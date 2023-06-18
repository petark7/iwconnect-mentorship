import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { Controller, useForm } from 'react-hook-form';
import Modal from '../Modal';
import AvailableTimes from '../AvailableTimes';
import DataTable from '../DataTable';
import { columns } from '../../constants/venueRoomsTable';
import { updateVenue } from '../../store/actions/venueActions';
import { getFormattedDate, getRows, getUserID } from '../../utils/roomTable';
import { addReservation, fetchReservations, getAvailableTimes } from '../../utils/firebaseUtils';
import './index.scss';

const RoomsTable = ({ venue, users }) => {
	const dispatch = useDispatch();
	const {
		reset,
		control,
		watch,
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	const [modal, setModal] = useState({
		roomID: 0,
		modalEditVisible: false,
		modalReserveVisible: false,
		modalDeleteVisible: false
	});
	const rows = venue?.rooms?.map(room => getRows(room, setModal));
	const selectedDate = watch('selectedDate');
	const selectedTime = watch('selectedTime');

	const [availableTimes, setAvailableTimes] = useState();

	const onDateChange = async date => {
		setValue('selectedDate', date);
		const availableTimes = await getAvailableTimes(venue.id, modal.roomID, getFormattedDate(date));
		setAvailableTimes(availableTimes);
		// Show available times once date is changed
		setModal(previousValue => (
			{
				...previousValue,
				showAvailableTimes: true
			}
		));
	};

	const clearData = () => {
		setValue('selectedDate', null);
		setValue('email', null);
		setValue('selectedTime', null);
		reset();
		setAvailableTimes([]);
	};

	// HANDLE RESERVING ROOM
	const reserveRoom = async data => {
		const formattedDate = getFormattedDate(selectedDate);
		const userID = getUserID(users, data.email);
		const formData = {
			venueID: venue.id,
			roomID: modal.roomID,
			userID,
			reservationDate: formattedDate,
			time: selectedTime
		};
		if (userID) {
			addReservation(formData);
			toast.success('Room reserved successfully!');
			setModal(0);
			clearData();
		} else {
			toast.error('User doesn\'t exist!');
		}
	};

	// HANDLE DELETING ROOM
	const deleteRoom = () => {
		try {
			const updatedVenue = { ...venue };
			const rooms = venue.rooms.filter(room => room.id !== modal.roomID);
			updatedVenue.rooms = rooms;
			dispatch(updateVenue(venue.id, updatedVenue));
			toast.success('Room deleted successfully!');
			setModal(0);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<DataTable rows={rows} columns={columns} itemsPerPage={20} />
			{modal.modalDeleteVisible && (
				<Modal
					isOpened={() => setModal(0)}
					title="Delete room"
				>
					<p>Are you sure you want to delete this room?</p>
					<div className="d-flex justify-content-end gap-1">
						<Button variant="success" onClick={deleteRoom}>
							Yes
						</Button>
						<Button variant="danger" onClick={() => setModal(0)()}>
							Cancel
						</Button>
					</div>
				</Modal>
			)}

			{modal.modalReserveVisible && (
				<Modal
					isOpened={() => {
						clearData();
						setModal(0);
					}}
					title="Reserve room"
					styleContainer="reserveRoom"
				>
					<Form onSubmit={handleSubmit(reserveRoom)}>
						<Form.Group className="mb-3">
							<Form.Label className="h5">User email</Form.Label>
							<Form.Control
								type="email"
								placeholder="name@example.com"
								{...register('email', {
									required: 'Email field cannot be empty.',
									pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
								}
								)}
							/>
							<p>{errors.email?.message}</p>
							<p>{errors.email?.pattern ? 'Entered email is not valid.' : null}</p>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="h5">Select date:</Form.Label>
							<div className="d-flex gap-3 flex-column mb-3">
								<Controller
									control={control}
									name="selectedDate"
									rules={{ required: 'Date is required' }}
									render={({ field }) => (
										<DatePicker value={field.value} onChange={onDateChange} />
									)}
								/>
								{errors.selectedDate && <span>{errors.selectedDate.message}</span>}

								<Controller
									control={control}
									name="selectedTime"
									rules={{ required: 'Time is required' }}
									render={({ field }) => (
										<AvailableTimes
											value={selectedTime}
											availableTimes={availableTimes}
											setSelected={selectedTime => {
												setValue(field.name, selectedTime);
											}}
										/>
									)}
								/>
								{errors.selectedTime && !selectedTime && <span>Please select a time</span>}
							</div>
						</Form.Group>

						<div className="d-flex justify-content-center gap-1">
							<Button className="roomsTable-reserveBtn" variant="success" type="submit">
								Reserve room
							</Button>
						</div>
					</Form>
				</Modal>
			)}
		</>
	);
};

export default RoomsTable;
