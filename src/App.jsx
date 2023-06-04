import { Toaster } from 'react-hot-toast';
import Router from './routes/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const App = () => (
	<>
		<Toaster />
		<Router />
	</>
);

export default App;
