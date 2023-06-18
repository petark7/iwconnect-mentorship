import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import { toast } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css'; // Forced import order here by XO
import RoomsTable from '../../components/RoomsTable';
import Layout from '../../components/Layout';
import RowTable from '../../components/RowTable';
import Profile from '../../components/Profile';
import EditDataModal from '../../components/EditDataModal';
import { getEditableVenueData, getAdditionalDetails } from '../../utils/venueDetailsUtils';
import { updateVenue } from '../../store/actions/venueActions';
import { fetchUsers } from '../../store/actions/userActions';
import './index.scss';

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

	const [showEditModal, setShowEditModal] = useState(false); // Venue edit modal
	const [venueProfile, setVenueProfile] = useState({});
	const [additionalInfo, setAdditionalInfo] = useState([]);

	const mapRef = useRef();

	useEffect(() => {
		setVenue(venues.find(venue => venue.id === Number.parseInt(venueID, 10)));
		dispatch(fetchUsers());
	}, [venues]);

	useEffect(() => {
		setVenueProfile({
			id: 1,
			image: venue?.image,
			company: venue?.name,
			address: venue?.description
		});
	}, [venue]);

	// TODO: IMPLEMENT USEREXISTS
	// const userExists = email => {
	// 	const user = users.find(user => user.email === email);
	// 	if (user) {
	// 		return true;
	// 	}

	// 	return false;
	// };

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

	return (
		<Layout>
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
						<RoomsTable venue={venue} users={users} />
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
