import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './navbar.scss';

const NavbarComponent = ({ children }) => (
	<Navbar bg="primary" variant="dark">
		<Container>
			<Navbar.Brand as={Link} to="/">Room Reservation</Navbar.Brand>
			<Nav className="text-center">
				{children}
			</Nav>
		</Container>
	</Navbar>
);

export default NavbarComponent;
