// AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'; // Import the initialized auth instance
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onIdTokenChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  if (!auth.isReady) return null; // Optionally render a loader here
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setSignedIn] = useState(false); // Start with false as a default
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      console.log('Auth state changed:', currentUser);

      if (!currentUser) {
        setSignedIn(false);
        setUser(null);
      } else {
        const tokenResult = await currentUser.getIdTokenResult();
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          token: tokenResult.token,
          claims: tokenResult.claims,
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResult.token}`;
        setSignedIn(true);
      }
      setIsReady(true);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password, remember = true) => {
    try {
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const tokenResult = await userCredential.user.getIdTokenResult();
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        token: tokenResult.token,
        claims: tokenResult.claims,
      });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResult.token}`;
      setSignedIn(true);
      return { success: true };
    } catch (error) {
      console.error('SignIn Error:', error);
      return { success: false, error };
    }
  };
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setSignedIn(false);
      delete axios.defaults.headers.common['Authorization'];
      return { success: true };
    } catch (error) {
      console.error('SignOut Error:', error);
      return { success: false, error };
    }
  };

  return {
    user,
    isReady,
    signIn,
    signOut,
    isSignedIn,
    isAuthenticated: !!user,
  };
};
