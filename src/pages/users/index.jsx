import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import DataTable from '../../components/DataTable';
import InviteUserModal from '../../components/InviteUserModal';
import ItemsPerPageControl from '../../components/ItemsPerPage';
import Modal from '../../components/Modal';
import { columns } from '../../constants/usersTable';
import { fetchUsers, deleteUser } from '../../store/actions/userActions';

const Users = ({ users }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [inviteUser, setInviteUser] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(20); // For pagination

	useEffect(() => {
		dispatch(fetchUsers());
	}, [users]);

	const deleteUserFromDB = async () => {
		const userID = selectedUserId;
		try {
			dispatch(deleteUser(userID));
			setSelectedUserId(0); // Close modal
			toast.success('User deleted succesffully.');
		} catch (error) {
			console.log(error);
			toast.error('User was not deleted successfully.');
		}
	};

	const rows = users?.map(user => {
		const deleteButton = (
			<Button
				variant="danger" onClick={event => {
					event.stopPropagation();
					setSelectedUserId(user.uid);
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
				<ItemsPerPageControl onSelect={setItemsPerPage} />
			</div>
			<InviteUserModal toggleModal={setInviteUser} isModalShown={inviteUser} />
			<DataTable
				columns={columns}
				rows={rows}
				itemsPerPage={itemsPerPage}
				onClick={userID => navigate(`/user-details/${userID}`)}
			/>

			{Boolean(selectedUserId) && (
				<Modal
					isOpened={setSelectedUserId}
					title="Delete user"
				>
					<p>Are you sure you want to delete this user?</p>
					<div className="d-flex justify-content-end gap-1">
						<Button variant="success" onClick={deleteUserFromDB}>
							Yes
						</Button>
						<Button variant="danger" onClick={() => setSelectedUserId(0)}>
							Cancel
						</Button>
					</div>
				</Modal>
			)}
		</Layout>
	);
};

const mapStateToProps = state => ({
	users: state.user.users
});

Users.propTypes = {
	users: PropTypes.array
};

export default connect(mapStateToProps)(Users);
