import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import RowTable from '../../components/RowTable';
import UserProfile from '../../components/UserProfile';
import './index.scss';

const UserDetails = () => {
	const { email } = useParams();
	const users = useSelector(state => state.users);

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
				name: 'Full Name',
				value: user.name
			},

			{
				name: 'Email',
				value: user.email
			},
			{
				name: 'Phone Number',
				value: user.phone
			},
			{
				name: 'Age',
				value: user.age
			}
		];
		setAdditionalInfo(formattedInfo);
	}, [user]);

	return (
		<Layout>
			<section style={{ backgroundColor: '#eee', padding: '30px' }}>
				<div className="user-details-title">User Details</div>
				<div className="d-flex justify-content-center row">
					<div className="col-lg-3">
						<UserProfile user={userProfile} />
					</div>
					<RowTable rows={additionalInfo} />
				</div>

			</section>
		</Layout>
	);
};

export default UserDetails;
