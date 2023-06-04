import PropTypes from 'prop-types';
import Footer from '../Footer';
import Navbar from '../Navbar';

const Layout = ({ children }) => (
	<>
		<Navbar />
		<div className="container flex-grow-1 py-3">
			{children}
		</div>
		<Footer />
	</>
);

Layout.propTypes = {
	children: PropTypes.node
};
export default Layout;
