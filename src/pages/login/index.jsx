import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { setUserRole } from '../../store/actions/userActions';
import './login.scss';
import { Navigate, useNavigate } from 'react-router';

const firebaseConfig = {
	apiKey: 'AIzaSyCnmB0flqjkoqggingviHwriy5lxcrfqVw',
	authDomain: 'iwconnect-mentorship.firebaseapp.com',
	projectId: 'iwconnect-mentorship',
	storageBucket: 'iwconnect-mentorship.appspot.com',
	messagingSenderId: '384055523695',
	appId: '1:384055523695:web:7792f92012ad3a894ed09a',
	measurementId: 'G-TJ6DV12JLY'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const Login = () => {
	const navigate = useNavigate();
	const cookies = new Cookies();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	// Add logged in user (roles) to the database
	const addToDatabase = async userData => {
		try {
			await setDoc(doc(db, 'users', userData.uid), {
				uid: userData.uid,
				email: userData.email,
				role: 'admin'
			});
			console.log('Document added successfully');
		} catch (error) {
			console.error('Error adding document:', error);
		}
	};

	const fetchUserRoles = async userData => {
		const docRef = doc(db, 'users', userData.uid); // Ref to the user
		const docSnap = await getDoc(docRef); // Snapshot to the document

		// Saves the role in the Redux Store
		if (docSnap.exists()) {
			dispatch(setUserRole(docSnap.data().role));
			cookies.set('userRole', docSnap.data().role, { path: '/' });
			navigate('/');
		} else {
			console.log('No such document!');
		}
	};

	const formSubmit = data => {
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user;
				toast.success('Logged in!');
				cookies.set('accessToken', user.accessToken, { maxAge: 3600 });
				// Upon successful login, set role to Redux store
				fetchUserRoles(user);
			})
			.catch(error => {
				// Can implement better error handling
				toast.error('Oops, it looks like you entered wrong credentials.');
				console.log(error);
			});
	};

	return (
		<div className="login-mainContainer">
			<div className="loginElements-container">
				<h1 className="login-heading">Login</h1>
				<Form className="login-loginForm" onSubmit={handleSubmit(formSubmit)}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							{...register('email', {
								required: 'Email field cannot be empty.',
								pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
							}
							)}
						/>
						<p>{errors.email?.message}</p>
						<p>{errors.email?.pattern ? 'Entered email is not valid.' : null}</p>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							{...register('password', {
								required: 'Password field cannot be empty.' })}
						/>
						<p>{errors.password?.message}</p>
					</Form.Group>
					<Button
						className="login-submitBtn"
						variant="primary"
						type="submit"
					>
						Login
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default Login;
