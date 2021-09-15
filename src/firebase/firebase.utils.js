import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
	apiKey: "AIzaSyBNlvYl7BQESGxuweVFyzhsez0f8IcJp04",
	authDomain: "crown-db-d7a95.firebaseapp.com",
	databaseURL:
		"https://crown-db-d7a95-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "crown-db-d7a95",
	storageBucket: "crown-db-d7a95.appspot.com",
	messagingSenderId: "554132748623",
	appId: "1:554132748623:web:1b53896544ebd3f1536d3a",
	measurementId: "G-F1P1RGMCGB",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}

	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
