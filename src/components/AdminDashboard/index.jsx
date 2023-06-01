import Navbar from '../../components/Navbar';
import Footer from '../Footer';
import './admin-dashboard.scss';

const Admin = () => (
	<div className="d-flex flex-column min-vh-100">
		<Navbar />
		<div className="container flex-grow-1 py-3">
			<h1>Users</h1>
		</div>
		<Footer />
	</div>
);

export default Admin;
