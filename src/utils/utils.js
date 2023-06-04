import Cookies from 'universal-cookie';

export const isUserLoggedIn = () => {
	const cookies = new Cookies();
	const accessToken = cookies.get('accessToken');

	if (accessToken) {
		return true;
	}

	return false;
};

export const isAdmin = () => {
	const cookies = new Cookies();
	const role = cookies.get('userRole');

	if (role === 'admin') {
		return true;
	}

	return false;
};
