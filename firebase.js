// firebase.js
import { initializeApp } from 'firebase/app'; // Initialize Firebase app
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { getReactNativePersistence } from 'firebase/auth'; // Import persistence
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Async storage for persistence

const firebaseConfig = {
  apiKey: "AIzaSyAq0Cjq02iyvc3r9TFRJlXsXPMWCLLuy5U",
  authDomain: "houzx-12490.firebaseapp.com",
  projectId: "houzx-12490",
  storageBucket: "houzx-12490.appspot.com",
  messagingSenderId: "46650836222",
  appId: "1:46650836222:android:22b8bf38c6038627cd51af"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = getAuth(app);
auth.setPersistence(getReactNativePersistence(ReactNativeAsyncStorage)); // Set persistence with AsyncStorage

export { auth }; // Export auth to use it in other files
