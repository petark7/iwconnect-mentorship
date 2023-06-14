import { useNavigate } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'universal-cookie';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { db } from '../../utils/firebaseUtils';
import './login.scss';

const auth = getAuth();
const Login = () => {
	const navigate = useNavigate();
	const cookies = new Cookies();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	// TODO: TRANSFER TO SIGNUP PAGE
	// Add logged in user to the database
	//
	// const addToDatabase = () => {
	// 	for (const user of mockData) {
	// 		try {
	// 			setDoc(doc(db, 'users', user.uid), {
	// 				uid: user.uid,
	// 				email: user.email,
	// 				role: 'user',
	// 				name: user.name,
	// 				age: user.age,
	// 				address: user.address,
	// 				phone: user.phone,
	// 				company: user.company,
	// 				image: user.image
	// 			});
	// 			console.log('Document added successfully');
	// 		} catch (error) {
	// 			console.error('Error adding document:', error);
	// 		}
	// 	}
	// };

	const fetchUserRoles = async userData => {
		const docRef = doc(db, 'users', userData.uid); // Ref to the user
		const docSnap = await getDoc(docRef); // Snapshot to the document

		if (docSnap.exists()) {
			cookies.set('userRole', docSnap.data().role, { path: '/' });
			navigate('/');
		} else {
			console.log('No such document!');
		}
	};

	const formSubmit = async data => {
		const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
		const user = userCredential.user;
		toast.success('Logged in!');
		cookies.set('accessToken', user.accessToken, { maxAge: 3600 });
		fetchUserRoles(user);
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
