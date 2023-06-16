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
import { updateUser } from '../../store/actions/userActions';
import { getEditableUserData, getAdditionalDetails } from '../../utils/userDetailsUtils';
import './index.scss';

const UserDetails = ({ users }) => {
	const { uid } = useParams();
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const [showEditModal, setShowEditModal] = useState(false);
	const [userProfile, setUserProfile] = useState({});
	const [additionalInfo, setAdditionalInfo] = useState([]);

	useEffect(() => {
		setUser(users.find(user => user.uid === uid));
	}, [users]);

	useEffect(() => {
		setUserProfile({
			id: 1,
			image: user?.image,
			company: user?.company,
			address: user?.address
		});
	}, [user]);

	useEffect(() => {
		setAdditionalInfo(getAdditionalDetails(user));
	}, [user]);

	const handleEditSubmit = async data => {
		dispatch(updateUser(user.uid, data));
		setShowEditModal(false);
		toast.success('Successfuly edited the data!');
	};

	return (
		<Layout>
			<section style={{ backgroundColor: '#eee', padding: '30px' }}>
				<div className="user-details-title">User Details</div>
				<div className="row">

					<div className="col-lg-3">
						<Profile actor={userProfile} />
					</div>

					<div className="col-lg-9">
						<div className="d-flex justify-content-end">
							<Button
								style={{ width: 'fit-content', marginBottom: 10 }}
								onClick={() => {
									setShowEditModal(true);
								}}
							>
								Edit Information
							</Button>
						</div>
						<RowTable rows={additionalInfo} />
					</div>
				</div>

				{showEditModal && (
					<EditDataModal
						data={getEditableUserData(user)}
						onClose={() => setShowEditModal(false)}
						onSubmit={handleEditSubmit}
					/>
				)}
			</section>
		</Layout>
	);
};

const mapStateToProps = state => ({
	users: state.user.users
});

UserDetails.propTypes = {
	users: PropTypes.array
};

export default connect(mapStateToProps)(UserDetails);
