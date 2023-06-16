import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout';
import RowTable from '../../components/RowTable';
import Profile from '../../components/Profile';
import EditDataModal from '../../components/EditDataModal';
import { getEditableVenueData, getAdditionalDetails } from '../../utils/venueDetailsUtils';
import { updateVenue } from '../../store/actions/venueActions';
import './index.scss';

const VenueDetails = ({ venues }) => {
	const { venueID } = useParams();
	const dispatch = useDispatch();
	const [venue, setVenue] = useState({});
	const [showEditModal, setShowEditModal] = useState(false);
	const [venueProfile, setVenueProfile] = useState({});
	const [additionalInfo, setAdditionalInfo] = useState([]);

	useEffect(() => {
		setVenue(venues.find(venue => venue.id === Number.parseInt(venueID, 10)));
		console.log(venue);
	}, []);

	useEffect(() => {
		setVenueProfile({
			id: 1,
			image: venue?.image,
			company: venue?.name,
			address: venue?.description
		});
	}, [venue]);

	useEffect(() => {
		setAdditionalInfo(getAdditionalDetails(venue));
	}, [venue]);

	const handleEditSubmit = async data => {
		dispatch(updateVenue(venue.id, data));
		setShowEditModal(false);
		toast.success('Successfuly edited the data!');
	};

	return (
		<Layout>
			<section style={{ backgroundColor: '#eee', padding: '30px' }}>
				<div className="venue-details-title">Venue Details</div>
				<div className="row">
					<div className="col-lg-3">
						<Profile actor={venueProfile} />
					</div>

					<div className="col-lg-9">
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
					<div className="col-lg-3">
						<h1>Map should go here</h1>
					</div>
					<div className="col-lg-9">
						<h1>Rooms should go here</h1>
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
	venues: state.venue.venues
});

VenueDetails.propTypes = {
	venues: PropTypes.array
};

export default connect(mapStateToProps)(VenueDetails);
