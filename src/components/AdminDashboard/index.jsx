import { createPortal } from 'react-dom';
import Navbar from '../../components/Navbar';
import Footer from '../Footer';
import './admin-dashboard.scss';

const Admin = () => (
	<div className="d-flex flex-column min-vh-100">
		<Navbar />
		<div className="container flex-grow-1 py-3">
			<h1>Users</h1>
			{createPortal(
				<p>This child is placed in the document body.</p>,
				document.body
			)}
		</div>
		<Footer />
	</div>
);

export default Admin;
