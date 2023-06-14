import axios from 'axios';
import { toast } from 'react-hot-toast';

const axiosInstance = axios.create();
// Request interceptor
axiosInstance.interceptors.request.use(
	config => config,
	error => Promise.reject(error) // Request errors can be handled here
);

// Response interceptor
axiosInstance.interceptors.response.use(
	response => response,
	error => {
		if (error.response) {
			// Handle HTTP error codes (e.g., 400, 401, 500)
			toast.error(`'Response Error:', ${error.response.status}`);
		} else if (error.request) {
			// Handle network errors
			toast.error(`Network Error:', ${error.request}`);
		} else {
			// Handle other errors
			toast.error(`'Error:', ${error.message}`);
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
