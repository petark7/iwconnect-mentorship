import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout';
import DataTable from '../../components/DataTable';
import InviteUserModal from '../../components/InviteUserModal';
import ItemsPerPageControl from '../../components/ItemsPerPage';
import { fetchVenues, deleteVenue } from '../../store/actions/venueActions';
import { columns } from '../../constants/venuesTable';
import Modal from '../../components/Modal';

const Venues = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const venues = useSelector(state => state.venue.venues);
	const [addVenueModal, setAddVenueModal] = useState(false);
	const [selectedVenueId, setSelectedVenueId] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(20); // For pagination

	useEffect(() => {
		dispatch(fetchVenues());
	}, []);

	const deleteVenueFromDB = async () => {
		try {
			dispatch(deleteVenue(selectedVenueId));
			setSelectedVenueId(0); // Close modal
			toast.success('Venue deleted succesffully.');
		} catch (error) {
			toast.error(`Venue was not deleted successfully. ${error}`);
		}
	};

	const rows = venues.map(venue => {
		const deleteButton = (
			<Button
				variant="danger" onClick={event => {
					event.stopPropagation();
					setSelectedVenueId(venue.id);
				}}
			>
				Delete
			</Button>
		);
		return 	({
			id: venue.id,
			name: venue.name,
			location: venue.location.address,
			rooms: venue.rooms.length,
			actions: deleteButton
		});
	});

	return (
		<Layout>
			<h1>Venues</h1>
			<div className="d-flex justify-content-between h-10">
				<Button
					variant="success" onClick={() => {
						setAddVenueModal(true);
					}}
				>
					Add a Venue
				</Button>
				<ItemsPerPageControl onSelect={setItemsPerPage} />
			</div>
			<InviteUserModal toggleModal={setAddVenueModal} isModalShown={addVenueModal} />
			<DataTable
				columns={columns}
				rows={rows}
				itemsPerPage={itemsPerPage}
				onClick={venueID => navigate(`/venue-details/${venueID}`)}
			/>

			{ Boolean(selectedVenueId)
				&& createPortal(
					<Modal
						isOpened={setSelectedVenueId} title="Delete venue"
					>
						<p>Are you sure you want to delete this venue?</p>
						<div className="d-flex justify-content-end gap-1">
							<Button
								variant="success" onClick={() => deleteVenueFromDB()}
							>
								Yes
							</Button>
							<Button variant="danger" onClick={() => setSelectedVenueId(0)}>Cancel</Button>
						</div>
					</Modal>, document.body)}
		</Layout>
	);
};

export default Venues;
