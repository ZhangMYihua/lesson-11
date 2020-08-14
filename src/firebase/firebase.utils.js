import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBq3_pH0um9oJRV6jGdl0BWFQJkYiviA4w",
  authDomain: "lape-clothing.firebaseapp.com",
  databaseURL: "https://lape-clothing.firebaseio.com",
  projectId: "lape-clothing",
  storageBucket: "lape-clothing.appspot.com",
  messagingSenderId: "837471088185",
  appId: "1:837471088185:web:eadf991373139d6046e7e8",
  measurementId: "G-3YKTD3XDQR"
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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
