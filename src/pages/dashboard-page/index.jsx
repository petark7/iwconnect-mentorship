import AdminPage from '../admin-page';
import UserPage from '../user-page';
import './dashboard-page.scss';

const DashboardPage = () => {
	// Add admin login check here
	const isAdmin = true;
	return (
		<>
			{isAdmin ? <AdminPage /> : <UserPage />}
		</>
	);
};

export default DashboardPage;
