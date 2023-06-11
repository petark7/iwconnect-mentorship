import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout';
import RowTable from '../../components/RowTable';
import UserProfile from '../../components/UserProfile';
import EditDataModal from '../../components/EditDataModal';
import { updateUser } from '../../store/actions/userActions';
import './index.scss';

const UserDetails = ({ users }) => {
	const { uid } = useParams();
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const [showEditModal, setShowEditModal] = useState(false);
	const [userProfile, setUserProfile] = useState({});
	const [additionalInfo, setAdditionalInfo] = useState([]);

	const fetchUserData = async () => {
		try {
			setUser(users.find(user => user.uid === uid));
		} catch (error) {
			console.log(error);
		}
	};

	const editableData = [
		{
			id: 'name',
			name: 'Full Name',
			value: user.name
		},

		{
			id: 'email',
			name: 'Email',
			value: user.email
		},
		{
			id: 'phone',
			name: 'Phone Number',
			value: user.phone
		},
		{
			id: 'age',
			name: 'Age',
			value: user.age
		},
		{
			id: 'company',
			name: 'Company',
			value: user.company
		},
		{
			id: 'address',
			name: 'Address',
			value: user.address
		}
	];
	useEffect(() => {
		fetchUserData();
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
		const formattedInfo = [
			{
				id: 'name',
				name: 'Full Name',
				value: user.name
			},

			{
				id: 'email',
				name: 'Email',
				value: user.email
			},
			{
				id: 'phone',
				name: 'Phone Number',
				value: user.phone
			},
			{
				id: 'age',
				name: 'Age',
				value: user.age
			}
		];
		setAdditionalInfo(formattedInfo);
	}, [user]);

	const handleEditSubmit = async data => {
		try {
			dispatch(updateUser(user.uid, data));
			setShowEditModal(false);
			toast.success('Successfuly edited the data!');
		} catch (error) {
			console.log(error);
			toast.error(error);
		}

		fetchUserData();
	};

	return (
		<Layout>
			<section style={{ backgroundColor: '#eee', padding: '30px' }}>
				<div className="user-details-title">User Details</div>
				<div className="row">
					<div className="col-lg-3">
						<UserProfile user={userProfile} />
					</div>

					<div className="col-lg-9">
						<div className="d-flex justify-content-end">
							<Button
								style={{ width: 'fit-content', marginBottom: 10 }}
								onClick={() => {
									setShowEditModal(true);
								}}
							> Edit Information
							</Button>
						</div>
						<RowTable rows={additionalInfo} />
					</div>
				</div>
				{showEditModal && createPortal(
					<EditDataModal
						data={editableData}
						onClose={() => {
							setShowEditModal(false);
						}}
						onSubmit={handleEditSubmit} />,
					document.body
				)}
			</section>
		</Layout>
	);
};

const mapStateToProps = state => ({
	users: state.users
});

UserDetails.propTypes = {
	users: PropTypes.array
};

export default connect(mapStateToProps)(UserDetails);
