import { initializeApp } from 'firebase/app';
import { getFirestore, query, where, doc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { getAuth, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'universal-cookie';
import firebaseConfig from '../constants/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const cookies = new Cookies();

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

export const deleteUser = async userID => {
	try {
		const user = doc(db, 'users', userID);
		await deleteDoc(user);
	} catch (error) {
		return error;
	}
};

export const logOut = async () => {
	try {
		signOut(auth);
		cookies.remove('accessToken');
		return 200;
	} catch (error) {
		return (error);
	}
};

export const getCollection = async collectionName => {
	try {
		const querySnapshot = await getDocs(collection(db, collectionName));
		const collectionData = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));
		return (collectionData);
	} catch (error) {
		console.log('Error getting the data:', error);
		throw error;
	}
};

export const getUserByEmail = async email => {
	try {
		const q = query(collection(db, 'users'), where('email', '==', email));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			// No matching documents found
			return null;
		}

		// Assume there's only one document matching the email
		const userDoc = querySnapshot.docs[0];
		const userData = {
			id: userDoc.id,
			...userDoc.data()
		};

		return userData;
	} catch (error) {
		console.log('Error getting user by email:', error);
		return null;
	}
};
