import AdminDashboard from '../../components/AdminDashboard';
import UserDashboard from '../../components/UserDashboard';
import './dashboard.scss';

const DashboardPage = () => {
	// Add admin login check here
	const isAdmin = true;
	return (
		<>
			{isAdmin ? <AdminDashboard /> : <UserDashboard />}
		</>
	);
};

export default DashboardPage;
