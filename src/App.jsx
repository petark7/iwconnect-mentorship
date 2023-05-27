import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import { Toaster } from 'react-hot-toast';
function App() {
	return (
		<>
			<div><Toaster/></div>
			<Login/>
		</>
	);
}

export default App;
