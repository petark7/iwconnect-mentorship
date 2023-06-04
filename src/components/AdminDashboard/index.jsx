import Footer from '../Footer';
import AdminNavbar from '../AdminNavbar';

const AdminDashboard = () => (
	<div className="d-flex flex-column min-vh-100">
		<AdminNavbar />
		<div className="container flex-grow-1 py-3">
			<h1>Dashboard</h1>
		</div>
		<Footer />
	</div>
);

export default AdminDashboard;
