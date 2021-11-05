import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
//prettier-ignore
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCdHT-AYHXjF7wOrfAchX4PIm3cSj5tn14",
  authDomain: "crwn-db.firebaseapp.com",
  databaseURL: "https://crwn-db.firebaseio.com",
  projectId: "crwn-db",
  storageBucket: "crwn-db.appspot.com",
  messagingSenderId: "850995411664",
  appId: "1:850995411664:web:7ddc01d597846f65",
};

const app = initializeApp(config);
const db = getFirestore(app);

export const userAuth = getAuth(app);
export const firestore = getFirestore(app);
export const createAccount = createUserWithEmailAndPassword;
export const signInAccount = signInWithEmailAndPassword;

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(userAuth, provider).catch((error) => console.log(error));

// 102Storing user data in Firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", `${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return {
    userRef,
    onSnapshot,
  };
};
