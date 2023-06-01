import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';
import LoginPage from '../pages/login';
import NotFoundPage from '../pages/not-found';
import DashboardPage from '../pages/dashboard';
import UnauthorizedPage from '../pages/unauthorized';
import Users from '../components/Users';
import AdminVenues from '../components/AdminVenues';
import RequireLogin from './RequireLogin';

const RouterComponent = () => (
	<Router>
		<Routes>
			<Route element={<RequireLogin />}>
				<Route path="/" element={<DashboardPage />} />
			</Route>

			<Route path="/admin/users" element={<Users />} />
			<Route path="/admin/venues" element={<AdminVenues />} />
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
