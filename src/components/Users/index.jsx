import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Layout from '../Layout';
import DataTable from '../DataTable';
import InviteUserModal from '../InviteUserModal';
import firebaseConfig from '../../constants/firebaseConfig';
import ItemsPerPageControl from '../ItemsPerPage';

const Users = () => {
	const [inviteUser, setInviteUser] = useState(false);
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	const [itemsPerPage, setItemsPerPage] = useState(20);
	const [users, setUsers] = useState([
		{
			uid: '',
			address: '',
			age: '',
			company: '',
			email: '',
			image: '',
			name: '',
			phone: '',
			role: ''
		}
	]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'users'));
				const usersData = querySnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));
				setUsers(usersData);
			} catch (error) {
				console.log('Error getting users:', error);
			}
		};

		fetchUsers();
	}, []);

	const usersData = [{ count: 0, data: null }];
	usersData.data = users.map(user => ({
		name: user.name,
		email: user.email,
		phone: user.phone
	}));
	usersData.count = users.length;

	const columns = [
		{
			title: 'User',
			key: 'name'
		},
		{
			title: 'Email',
			key: 'email'
		},
		{
			title: 'Phone',
			key: 'phone'
		}
	];

	return (
		<Layout>
			<h1>Users</h1>
			<div className="d-flex justify-content-between h-10">
				<Button
					variant="success" onClick={() => {
						setInviteUser(true);
					}}
				>
					Invite User
				</Button>
				<ItemsPerPageControl itemsPerPage={setItemsPerPage} />
			</div>
			<InviteUserModal toggleModal={setInviteUser} isModalShown={inviteUser} />
			<DataTable columns={columns} data={usersData.data} dataCount={usersData.count} itemsPerPage={itemsPerPage} />
		</Layout>
	);
};

export default Users;
