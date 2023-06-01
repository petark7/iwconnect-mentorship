import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.scss';

const NavbarComponent = () => (
	<Navbar bg="primary" variant="dark">
		<Container>
			<Navbar.Brand href="#home">Room Reservation</Navbar.Brand>
			<Nav className="text-center">
				<Nav.Link href="#users">Users</Nav.Link>
				<Nav.Link href="#venues">Venues</Nav.Link>
			</Nav>
		</Container>
	</Navbar>
);

export default NavbarComponent;
