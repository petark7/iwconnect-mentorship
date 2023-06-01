import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

const RequireAuth = ({ allowedRoles }) => {
	const location = useLocation();
	const cookies = new Cookies();
	const userRole = cookies.get('userRole');
	// Auth logic goes here
	return allowedRoles.includes(userRole) ? (
		<Outlet />
	) : (userRole ? (
		<Navigate replace to="/unauthorized" state={{ from: location }} />
	) : (
		<Navigate replace to="/login" state={{ from: location }} />
	));
};

RequireAuth.propTypes = {
	allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RequireAuth;
