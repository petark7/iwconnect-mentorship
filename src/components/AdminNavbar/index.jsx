import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const AdminNavbar = () => (
	<Navbar>
		<Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
		<Nav.Link as={Link} to="/admin/venues">Venues</Nav.Link>
	</Navbar>
);

export default AdminNavbar;
