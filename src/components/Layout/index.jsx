import PropTypes from 'prop-types';
import Footer from '../Footer';
import Navbar from '../Navbar';

const Layout = ({ children }) => (
	<div className="d-flex flex-column min-vh-100">
		<Navbar />
		<div className="container flex-grow-1 py-3">
			{children}
		</div>
		<Footer />
	</div>
);

Layout.propTypes = {
	children: PropTypes.node
};
export default Layout;
