import Footer from '../Footer';
import AdminNavbar from '../AdminNavbar';

const Admin = () => (
	<div className="d-flex flex-column min-vh-100">
		<AdminNavbar />
		<div className="container flex-grow-1 py-3">
			<h1>Admin Dashboard</h1>
			<h4>Fancy data will go here</h4>
		</div>
		<Footer />
	</div>
);

export default Admin;
