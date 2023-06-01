import Router from './routes/router';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import './app.css';

const App = () => (
	<>
		<div><Toaster /></div>
		<Router />
	</>
);

export default App;
