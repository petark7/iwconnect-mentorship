import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './routes/router';
import './app.css';

const App = () => (
	<>
		<Toaster />
		<Router />
	</>
);

export default App;
