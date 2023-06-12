import Cookies from 'universal-cookie';

export const isUserLoggedIn = () => {
	const cookies = new Cookies();
	const accessToken = cookies.get('accessToken');

	return Boolean(accessToken);
};

export const isAdmin = () => {
	const cookies = new Cookies();
	const role = cookies.get('userRole');

	return role === 'admin';
};
