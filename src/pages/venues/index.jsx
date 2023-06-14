import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import DataTable from '../../components/DataTable';
import InviteUserModal from '../../components/InviteUserModal';
import ItemsPerPageControl from '../../components/ItemsPerPage';
import { fetchVenues } from '../../store/actions/venueActions';
import { addDocument } from '../../utils/firebaseUtils';
import venueData from '../../venue_data.json';
import Modal from '../../components/Modal';

const Venues = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const venues = useSelector(state => state.venue.venues);
	const [addVenueModal, setAddVenueModal] = useState(false);
	const [deleteVenueModal, setDeleteVenueModal] = useState({
		venueID: null
	});
	const [itemsPerPage, setItemsPerPage] = useState(20); // For pagination

	const handleTableClick = venueID => {
		navigate(`/venue-details/${venueID}`);
	};

	useEffect(() => {
		dispatch(fetchVenues());
	}, []);

	const rows = venues.map(venue => {
		const deleteButton = (
			<Button
				variant="danger" onClick={event => {
					event.stopPropagation();
					setDeleteVenueModal({ venueID: venue.id });
				}}
			>Delete
			</Button>
		);
		return 	({
			id: venue.id,
			name: venue.name,
			location: venue.location,
			availableRooms: venue.available_rooms.length,
			actions: deleteButton
		});
	});

	const columns = [
		{
			title: 'Venue Name',
			key: 'name'
		},
		{
			title: 'Location',
			key: 'location'
		},
		{
			title: 'Available Rooms',
			key: 'availableRooms'
		},
		{
			title: 'Actions',
			key: 'actions'
		}
	];

	return (
		<Layout>
			<h1>Users</h1>
			<div className="d-flex justify-content-between h-10">
				<Button
					variant="success" onClick={() => {
						setAddVenueModal(true);
					}}
				>
					Add a Venue
				</Button>
				<ItemsPerPageControl itemsPerPage={setItemsPerPage} />
			</div>
			<InviteUserModal toggleModal={setAddVenueModal} isModalShown={addVenueModal} />
			<DataTable columns={columns} rows={rows} itemsPerPage={itemsPerPage} onClick={handleTableClick} />

			{ Boolean(deleteVenueModal.venueID)
				&& createPortal(
					<Modal
						isOpened={setDeleteVenueModal} title="Delete venue"
					>
						<p>Are you sure you want to delete this venue?</p>
						<div className="d-flex justify-content-end gap-1">
							<Button variant="success" onClick={() => {}}>Yes</Button>
							<Button variant="danger" onClick={() => setDeleteVenueModal(false)}>Cancel</Button>
						</div>
					</Modal>, document.body)}
		</Layout>
	);
};

export default Venues;
