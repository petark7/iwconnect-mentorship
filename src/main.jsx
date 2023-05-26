import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './app.jsx';
import './index.css';

ReactDOM.createRoot(document.querySelector('#root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
