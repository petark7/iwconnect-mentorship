import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Layout from '../Layout';
import UsersTable from '../UsersTable';
import InviteUserModal from '../InviteUserModal';
import usersData from '../../MOCK_DATA';

const Users = () => {
	const [inviteUser, setInviteUser] = useState(false);
	return (
		<Layout>
			<h1>Users</h1>
			<div>
				<Button
					variant="success" onClick={() => {
						setInviteUser(true);
					}}
				>
					Invite User
				</Button>
			</div>
			<InviteUserModal toggleModal={setInviteUser} isModalShown={inviteUser} />
			<UsersTable usersData={usersData} />
		</Layout>
	);
};

export default Users;
