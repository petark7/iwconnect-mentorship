import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
	const location = useLocation();
	// User roles will be fetched from Firebase
	// When user successfully logs in, the userRoles get updated
	// When user is not logged in, the userRoles is empty. If empty -> navigate to login
	const userRoles = ['user']; // This should be read from Redux Store

	return userRoles?.find(role => allowedRoles?.includes(role)) ? (
		<Outlet />
	) : (userRoles ? (
		<Navigate replace to="/unauthorized" state={{ from: location }} />
	) : (
		<Navigate replace to="/login" state={{ from: location }} />
	));
};

RequireAuth.propTypes = {
	allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RequireAuth;
