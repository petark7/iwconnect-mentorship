import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const UsersTable = ({ usersData }) => (
	<Table striped>
		<thead>
			<tr>
				<th>#</th>
				<th>User</th>
				<th>Email</th>
				<th>Phone</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{usersData.map((user, index) => (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td>{user.phone}</td>
					<td>
						<Button
							style={{ width: '100px' }}
							variant="danger"
							onClick={() => {
								alert(`handle button click, userID: ${user.uid}`);
							}}
						>
							Delete
						</Button>
					</td>
				</tr>
			))}
		</tbody>
	</Table>
);

export default UsersTable;
