import Footer from '../Footer';
import Navbar from '../Navbar';

const Users = () => (
	<div className="d-flex flex-column min-vh-100">
		<Navbar />
		<div className="container flex-grow-1 py-3">
			<h1>USERS</h1>
		</div>
		<Footer />
	</div>
);

export default Users;
