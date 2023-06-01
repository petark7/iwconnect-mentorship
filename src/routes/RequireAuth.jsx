import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
	const location = useLocation();
	const userRole = 'user'; // This should be read from Redux Store

	// Auth logic goes here
};

RequireAuth.propTypes = {
	allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RequireAuth;
