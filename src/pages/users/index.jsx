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
import Modal from '../../components/Modal';
import { deleteUser, getCollection } from '../../utils/firebaseUtils';
import { storeUsers } from '../../store/actions/userActions';

const Users = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const users = useSelector(state => state.users);

	// MODAL STATE
	const [inviteUser, setInviteUser] = useState(false);
	const [deleteUserModal, setDeleteUserModal] = useState({
		userID: null
	});

	const [itemsPerPage, setItemsPerPage] = useState(20); // For pagination

	const handleTableClick = userID => {
		navigate(`/user-details/${userID}`);
	};

	const fetchUsers = async () => {
		try {
			// Get data from API and set to Redux
			const users = await getCollection('users');
			dispatch(storeUsers(users));
		} catch (error) {
			console.log('Error getting users:', error);
		}
	};

	useEffect(() => {
		// FETCH DATA FROM API IF HASN'T ALREADY FETCHED
		if (users.length === 0) {
			fetchUsers();
		}
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
			id: user.uid,
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
			<DataTable columns={columns} rows={rows} itemsPerPage={itemsPerPage} onClick={handleTableClick} />

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
