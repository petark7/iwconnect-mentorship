import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './index.scss';

const NavbarComponent = () => {
	const cookies = new Cookies();
	const userRole = cookies.get('userRole');
	const adminLinks = [
		{
			id: 1,
			path: '/users',
			display: 'Users'
		},
		{
			id: 2,
			path: '/venues',
			display: 'Venues'
		}
	];

	const userLinks = [
		{
			id: 1,
			path: '/reservations',
			display: 'Reservations'
		},
		{
			id: 2,
			path: '/venues',
			display: 'Venues'
		},
		{
			id: 3,
			path: '/profile',
			display: 'Profile'
		}
	];

	const renderLinks = links => {
		const navLinks = links.map(link => <Nav.Link key={link.id} as={Link} to={link.path}>{link.display}</Nav.Link>);
		return navLinks;
	};

	return (
		<Navbar bg="primary" variant="dark">
			<Container>
				<Navbar.Brand as={Link} to="/">Room Reservation</Navbar.Brand>
				<Nav className="text-center">
					{userRole === 'admin' ? renderLinks(adminLinks) : renderLinks(userLinks)}
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
