// Import the functions you need from the Firebase SDK
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_ST_BUCK,
  messagingSenderId: process.env.FIREBASE_SEN_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get token
export const requestForToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: process.env.FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        return currentToken;
      } else {
        setTokenFound(false);
        return null;
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token. ', err);
      setTokenFound(false);
      return null;
    });
};

// Listener for incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
