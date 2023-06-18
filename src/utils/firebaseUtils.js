import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, deleteDoc, getDocs, collection, updateDoc, query, where } from 'firebase/firestore';
import { getAuth, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'universal-cookie';
import { toast } from 'react-hot-toast';
import firebaseConfig from '../constants/firebaseConfig';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const reservationsCollection = collection(db, 'reservations');
const auth = getAuth();
const cookies = new Cookies();

export const addUser = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const { user } = userCredential;
		return user;
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

export const deleteVenue = async venueID => {
	try {
		console.log(venueID);
		const venue = doc(db, 'venues', String(venueID));
		await deleteDoc(venue);
	} catch (error) {
		console.log(error);
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
		const docRef = doc(db, collectionName, String(userId));
		await updateDoc(docRef, documentData);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const addDocument = async (collectionName, id, documentData) => {
	try {
		await setDoc(doc(db, collectionName, id), documentData);
		console.log(`Successfully added document in ${collectionName}`);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const addDocuments = async (collectionName, data) => {
	try {
		await data.forEach(async element => {
			await setDoc(doc(db, collectionName, String(element.id)), element);
		});
		toast('added');
	} catch (error) {
		console.log(error);
	}
};

export const addReservation = async data => {
	const newReservationRef = doc(reservationsCollection);
	const newReservationId = newReservationRef.id;

	const reservationData = {
		...data,
		reservationID: newReservationId
	};

	try {
		await setDoc(newReservationRef, reservationData);
	} catch (error) {
		throw error;
	}
};

export const fetchReservations = async (venueID, roomID) => {
	const q = query(reservationsCollection,
		where('venueID', '==', venueID),
		where('roomID', '==', roomID)
	);

	try {
		const querySnapshot = await getDocs(q);
		const reservations = querySnapshot.docs.map(doc => doc.data());

		return reservations;
	} catch (error) {
		console.log('Error fetching reservations:', error);
		return [];
	}
};

export const getAvailableTimes = async (venueID, roomID, reservationDate) => {
	const allTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
	const reservations = await fetchReservations(venueID, roomID);
	const unavailableTimes = new Set(reservations.map(reservation => {
		if (reservation.reservationDate === reservationDate) {
			return reservation.time;
		}
	}));
	const availableTimes = allTimes.filter(item => !unavailableTimes.has(item));

	return availableTimes;
};
