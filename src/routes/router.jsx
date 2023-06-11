import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';
import LoginPage from '../pages/login';
import NotFoundPage from '../pages/not-found';
import DashboardPage from '../pages/dashboard';
import UnauthorizedPage from '../pages/unauthorized';
import UsersPage from '../pages/users';
import VenuesPage from '../pages/venues';
import UserDetails from '../pages/user-details';
import RequireLogin from './RequireLogin';
import RequireAuth from './RequireAuth';

const RouterComponent = () => (
	<Router>
		<Routes>
			<Route element={<RequireLogin />}>
				<Route path="/" element={<DashboardPage />} />
			</Route>

			<Route element={<RequireAuth allowedRoles="admin" />}>
				<Route path="/users" element={<UsersPage />} />
				<Route path="/user-details/:uid" element={<UserDetails />} />
				<Route path="/venues" element={<VenuesPage />} />
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
