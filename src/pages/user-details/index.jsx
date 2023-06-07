import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import RowTable from '../../components/RowTable';
import UserProfile from '../../components/UserProfile';
import { getCollection, getUserByEmail } from '../../utils/firebaseUtils';

const UserDetails = () => {
	const { email } = useParams();
	const [userData, setUserData] = useState([]);
	const [user, setUser] = useState({});
	const [userProfile, setUserProfile] = useState({});
	const [additionalInfo, setAdditionalInfo] = useState([]);

	const rowsData = [{
		id: 0,
		name: 'Full Name',
		value: 'John Doe'
	},
	{
		id: 1,
		name: 'Email',
		value: 'blabla@gmail.com'
	}];

	const fetchUserData = async () => {
		try {
			const data = await getCollection('users');
			setUserData(data);
			setUser(data.find(user => user.email === email));
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

	console.log(userProfile);

	return (
		<Layout>
			<section style={{ backgroundColor: '#eee', padding: '30px' }}>
				<div className="d-flex justify-content-center row">
					<div className="col-lg-3">
						<UserProfile user={userProfile} />
					</div>
					<RowTable rows={rowsData} />
				</div>

			</section>
		</Layout>
	);
};

export default UserDetails;
