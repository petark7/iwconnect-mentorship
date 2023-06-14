import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { adminLinks, userLinks } from '../../constants/navLinks';
import './index.scss';

const NavbarComponent = () => {
	const cookies = new Cookies();
	const userRole = cookies.get('userRole');

	const links = userRole === 'admin' ? adminLinks : userLinks;

	return (
		<Navbar bg="primary" variant="dark">
			<Container>
				<Navbar.Brand as={Link} to="/">Room Reservation</Navbar.Brand>
				<Nav className="text-center">
					{links.map(({ id, path, display }) => (
						<Nav.Link key={id} as={Link} to={path}>
							{display}
						</Nav.Link>
					))}
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
