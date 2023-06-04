import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import AdminNavbar from '../AdminNavbar';
import Footer from '../Footer';
import UsersTable from '../UsersTable';
import usersData from '../../MOCK_DATA';
import InviteUserModal from '../InviteUserModal';

const Users = () => {
	const [inviteUser, setInviteUser] = useState(false);
	return (
		<div className="d-flex flex-column min-vh-100">
			<AdminNavbar />
			<div className="container flex-grow-1 py-3">
				<h1>Users</h1>
				<div>
					<Button
						variant="success" onClick={() => {
							setInviteUser(true);
						}}
					>Invite User
					</Button>
				</div>
				<InviteUserModal toggleModal={setInviteUser} isModalShown={inviteUser} />
				<UsersTable usersData={usersData} />
			</div>
			<Footer />
		</div>
	);
};

export default Users;
