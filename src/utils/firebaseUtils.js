import { initializeApp } from 'firebase/app';
import { getFirestore, doc, deleteDoc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'universal-cookie';
import firebaseConfig from '../constants/firebaseConfig';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth();
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

export const updateDocument = async (collectionName, userId, documentData) => {
	try {
		const docRef = doc(db, collectionName, userId);
		await updateDoc(docRef, documentData);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
