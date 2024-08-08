// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAdditionalUserInfo } from 'firebase/auth';
import {
  getAuth,
  connectAuthEmulator,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCf1eApnuusi_lTy21urBHFDaVEPqNqW6E',
  authDomain: 'chitchat-26077.firebaseapp.com',
  projectId: 'chitchat-26077',
  storageBucket: 'chitchat-26077.appspot.com',
  messagingSenderId: '734983022575',
  appId: '1:734983022575:web:e255df56375d13a9aeb81a',
  measurementId: 'G-TYB3WEZQ2P',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

// if (window.location.hostname === 'localhost') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export const loginWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, fbProvider);
    const user = result.user;
    console.log('User', user);
    // Lấy additionalUserInfo
    const additionalUserInfo = getAdditionalUserInfo(result);
    console.log('Additional User Info:', additionalUserInfo);
    return { user, additionalUserInfo };
  } catch (error) {
    console.error('Error during Facebook login', error);
    return null;
  }
};
export const loginWithGoogle = async () => {
  try {
    // Thực hiện đăng nhập với Google
    const result = await signInWithPopup(auth, ggProvider);
    const user = result.user;
    console.log({ user });
    // Lấy additionalUserInfo
    const additionalUserInfo = getAdditionalUserInfo(result);
    console.log('Additional User Info:', additionalUserInfo);
    return { user, additionalUserInfo };
  } catch (error) {
    console.error('Error during Google login', error);
    return null;
  }
};

export { auth, db, storage, onAuthStateChanged };
export default app;
