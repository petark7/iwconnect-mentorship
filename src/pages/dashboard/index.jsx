import Cookies from 'universal-cookie';
import AdminDashboard from '../../components/Admin';
import UserDashboard from '../../components/UserDashboard';
import './dashboard.scss';

const DashboardPage = () => {
	const cookies = new Cookies();
	const userRole = cookies.get('userRole');
	// Add admin login check here
	return (
		<>
			{userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />}
		</>
	);
};

export default DashboardPage;
