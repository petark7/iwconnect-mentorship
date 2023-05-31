import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';
import AdminPage from '../pages/admin-page';
import LoginPage from '../pages/login-page';
import UserPage from '../pages/user-page';
import NotFoundPage from '../pages/not-found-page';
import DashboardPage from '../pages/dashboard-page';
import UnauthorizedPage from '../pages/unauthorized-page';
import RequireAuth from './RequireAuth';

const RouterComponent = () => (
	<Router>
		<Routes>
			<Route path="/" element={<DashboardPage />} />
			<Route element={<RequireAuth allowedRoles={['admin']} />}>
				<Route path="/admin" element={<AdminPage />} />
			</Route>

			<Route element={<RequireAuth allowedRoles={['user']} />}>
				<Route path="/user" element={<UserPage />} />
			</Route>

			<Route path="/login" element={<LoginPage />} />
			<Route
				path="/unauthorized"
				element={<UnauthorizedPage />}
			/>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	</Router>
);

export default RouterComponent;
