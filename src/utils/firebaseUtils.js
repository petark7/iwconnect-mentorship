import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from '../../constants/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export const addUser = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const { user } = userCredential;
		console.log(`Added user successfuly. ${user.email}`);
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;

		console.log(errorMessage);
		return errorCode;
	}
};

export const logOut = async () => {
	try {
		signOut(auth);
		return 200;
	} catch (error) {
		return (error);
	}
};
