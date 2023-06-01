import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../Footer';

const AdminVenues = () => (
	<div className="d-flex flex-column min-vh-100">
		<AdminNavbar />
		<div className="container flex-grow-1 py-3">
			<h1>Venues</h1>
		</div>
		<Footer />
	</div>
);

export default AdminVenues;
