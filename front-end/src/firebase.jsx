import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

// Initialize Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FB_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FB_APP_ID,
    measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and set persistence
const auth = getAuth(app);

console.log(auth)
setPersistence(auth, browserLocalPersistence);

// Initialize Firebase Messaging (optional, only if you are using messaging)
const messaging = getMessaging(app);

// Function to get the Firebase token (for messaging)
export async function getFirebaseToken() {
    try {
        const token = await getToken(messaging);
        return token;
    } catch (error) {
        console.error("Error getting Firebase token:", error);
        throw error;
    }
}

export { auth, messaging }; // Export auth and messaging for use in other parts of your app
export default app; // Export the initialized app
