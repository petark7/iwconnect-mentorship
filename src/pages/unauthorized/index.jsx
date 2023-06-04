import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './unauthorized.scss';

const Unauthorized = () => {
	const navigate = useNavigate();

	return (
		<main className="unauthorized-mainContainer">
			<h2 className="unauthorized-h2">Error: 403 unauthorized</h2>
			<p className="unauthorized-details">Sorry, you don&apos;t have permissions to access this page.</p>
			<Button variant="primary" onClick={() => navigate('/login')}>Go to Login</Button>
		</main>
	);
};

export default Unauthorized;
