import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout';
import DataTable from '../../components/DataTable';
import InviteUserModal from '../../components/InviteUserModal';
import firebaseConfig from '../../constants/firebaseConfig';
import { deleteUser } from '../../utils/firebaseUtils';
import ItemsPerPageControl from '../../components/ItemsPerPage';
import Modal from '../../components/Modal';

const Users = () => {
	const [inviteUser, setInviteUser] = useState(false);
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	const [deleteUserModal, setDeleteUserModal] = useState({
		userID: null
	});
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

	useEffect(() => {
		fetchUsers();
	}, []);

	const deleteUserFromDB = async () => {
		const { userID } = deleteUserModal;
		try {
			deleteUser(userID);
			fetchUsers(); // Refresh table
			setDeleteUserModal(false); // Close modal
			toast.success('User deleted succesffully.');
		} catch (error) {
			console.log(error);
			toast.error('User was not deleted successfully.');
		}
	};

	const rows = users.map(user => {
		const deleteButton = (
			<Button
				variant="danger" onClick={event => {
					event.stopPropagation();
					setDeleteUserModal({ userID: user.uid });
				}}
			>Delete
			</Button>
		);
		return 	({
			name: user.name,
			email: user.email,
			phone: user.phone,
			actions: deleteButton
		});
	});

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
						setInviteUser(true);
					}}
				>
					Invite User
				</Button>
				<ItemsPerPageControl itemsPerPage={setItemsPerPage} />
			</div>
			<InviteUserModal toggleModal={setInviteUser} isModalShown={inviteUser} />
			<DataTable columns={columns} rows={rows} itemsPerPage={itemsPerPage} />

			{ Boolean(deleteUserModal.userID)
			&& createPortal(
				<Modal
					isOpened={setDeleteUserModal} title="Delete user"
				>
					<p>Are you sure you want to delete this user?</p>
					<div className="d-flex justify-content-end gap-1">
						<Button variant="success" onClick={deleteUserFromDB}>Yes</Button>
						<Button variant="danger" onClick={() => setDeleteUserModal(false)}>Cancel</Button>
					</div>
				</Modal>, document.body)}
		</Layout>
	);
};

export default Users;
