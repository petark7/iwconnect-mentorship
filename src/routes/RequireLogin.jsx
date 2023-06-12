import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

const RequireLogin = () => {
	const location = useLocation();
	const cookies = new Cookies();
	// Check if user is logged in
	const loginToken = cookies.get('accessToken');

	return (loginToken) ? <Outlet /> : <Navigate replace to="/login" state={{ from: location }} />;
};

export default RequireLogin;
