import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Layout from '../../components/Layout';
import RowTable from '../../components/RowTable';
import UserProfile from '../../components/UserProfile';
import EditDataModal from '../../components/EditDataModal';
import { getUserByEmail } from '../../utils/firebaseUtils';
import './index.scss';

const UserDetails = () => {
	const { email } = useParams();
	const users = useSelector(state => state.users);
	const [showEditModal, setShowEditModal] = useState(false);

	const [user, setUser] = useState({});
	const [userProfile, setUserProfile] = useState({});
	const [additionalInfo, setAdditionalInfo] = useState([]);

	const fetchUserData = async () => {
		try {
			setUser(users.find(user => user.email === email));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

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
		// Update data to API
		const getUser = await getUserByEmail(data.email);
		console.log(getUser);
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
						data={additionalInfo}
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

export default UserDetails;
