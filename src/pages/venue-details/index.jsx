import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import { toast } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import Layout from '../../components/Layout';
import RowTable from '../../components/RowTable';
import Profile from '../../components/Profile';
import EditDataModal from '../../components/EditDataModal';
import DataTable from '../../components/DataTable';
import { getEditableVenueData, getAdditionalDetails } from '../../utils/venueDetailsUtils';
import { addDocuments } from '../../utils/firebaseUtils';
import { getRows } from '../../utils/roomTable';
import { updateVenue } from '../../store/actions/venueActions';
import { columns } from '../../constants/venueRoomsTable';
import Modal from '../../components/Modal';
import venuesArray from '../../venue_data5.json';
import './index.scss';
import { fetchUsers } from '../../store/actions/userActions';

const VenueDetails = ({ venues, users }) => {
	const { venueID } = useParams();
	const dispatch = useDispatch();

	const [venue, setVenue] = useState({
		location: {
			lat: 0,
			lon: 0
		}
	});
	// Room modification modals
	const [modal, setModal] = useState({
		roomID: 0,
		modalEditVisible: false,
		modalReserveVisible: false,
		modalDeleteVisible: false
	});
	const [showEditModal, setShowEditModal] = useState(false); // Venue edit modal
	const [venueProfile, setVenueProfile] = useState({});
	const [additionalInfo, setAdditionalInfo] = useState([]);

	const mapRef = useRef();

	useEffect(() => {
		setVenue(venues.find(venue => venue.id === Number.parseInt(venueID, 10)));
		dispatch(fetchUsers());
	}, []);

	const rows = venue?.rooms?.map(room => getRows(room, setModal));

	useEffect(() => {
		setVenueProfile({
			id: 1,
			image: venue?.image,
			company: venue?.name,
			address: venue?.description
		});
	}, [venue]);

	const userExists = email => {
		const user = users.find(user => user.email === email);
		if (user) {
			return true;
		}

		return false;
	};

	// Update map coordinates as soon as page loads.
	useEffect(() => {
		if (mapRef.current && venue.location.lat && venue.location.lon) {
			mapRef.current.setView([venue.location.lat, venue.location.lon], 13);
		}
	}, [venue.location.lat, venue.location.lon]);

	// Set additional details after venue is read
	useEffect(() => {
		setAdditionalInfo(getAdditionalDetails(venue));
	}, [venue]);

	// HANDLE EDITING VENUE DATA
	const handleEditSubmit = async data => {
		dispatch(updateVenue(venue.id, data));
		setShowEditModal(false);
		toast.success('Successfuly edited the data!');
	};

	// HANDLE RESERVING ROOM
	const reserveRoom = () => {
		// TODO: ADD TO USER RESERVATIONS
		const updatedVenue = { ...venue };
		const roomIndex = updatedVenue.rooms.findIndex(room => room.id === modal.roomID);
		if (roomIndex !== -1) {
			// Update the available field of the room
			updatedVenue.rooms[roomIndex].available = false; // Example update, modify as needed
		}

		dispatch(updateVenue(venue.id, updatedVenue));
		toast.success('Room reserved successfully!');
		setModal(0);
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
		<Layout>
			<Button onClick={() => {
				// AddDocuments('venues', venuesArray);
				// const updatedVenue = { ...venue };
				// updatedVenue.rooms[modal.roomID].available = false;
				// alert(JSON.stringify(updatedVenue));
				alert(JSON.stringify(venue.rooms));
			}}
			>
				Add data
			</Button>
			<section style={{ backgroundColor: '#eee', padding: '30px' }}>
				<h2 className="text-center mb-3">Venue Details</h2>
				<div className="row">
					<div className="venueDetails-profile col-lg-3 shadow-sm p-3 mb-3 bg-body rounded">
						<Profile actor={venueProfile} />
					</div>

					<div className="venueDetails-venueData col-lg-9 shadow-sm p-3 mb-3 bg-body rounded">
						<div className="d-flex justify-content-end">
							<Button
								style={{ width: 'fit-content', marginBottom: 10 }}
								onClick={() => setShowEditModal(true)}
							>
								Edit Information
							</Button>
						</div>
						<RowTable rows={additionalInfo} />
					</div>
					<div className="venueDetails-map col-lg-3 shadow-sm p-3 mb-5 bg-body rounded">
						<div>
							<h3 className="text-center mb-3">Location</h3>
							<MapContainer
								ref={mapRef}
								scrollWheelZoom
								center={[venue.location.lat, venue.location.lat]}
								zoom={13}
							>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>
							</MapContainer>
						</div>
					</div>
					<div className="venueDetails-rooms col-lg-9 shadow-sm p-3 mb-5 bg-body rounded">
						<h3 className="text-center mb-3">Rooms</h3>
						<DataTable columns={columns} rows={rows} itemsPerPage={20} onClick={() => {}} />
					</div>
				</div>

				{showEditModal && (
					<EditDataModal
						data={getEditableVenueData(venue)}
						onClose={() => {
							setShowEditModal(false);
						}}
						onSubmit={handleEditSubmit}
					/>
				)}

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
						isOpened={() => setModal(0)}
						title="Reserve room"
					>
						<p>Are you sure you want to reserve this room?</p>
						<div className="d-flex justify-content-end gap-1">
							<Button variant="success" onClick={reserveRoom}>
								Reserve room
							</Button>
							<Button variant="danger" onClick={() => setModal(0)}>
								Cancel
							</Button>
						</div>
					</Modal>
				)}
			</section>
		</Layout>
	);
};

const mapStateToProps = state => ({
	venues: state.venue.venues,
	users: state.user.users
});

VenueDetails.propTypes = {
	venues: PropTypes.array,
	users: PropTypes.array
};

export default connect(mapStateToProps)(VenueDetails);
