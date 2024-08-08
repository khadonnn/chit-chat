import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../firebase/config';
import { Spin } from 'antd';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        navigate('/');
        return;
      } else {
        setIsLoading(false);
        navigate('/login');
      }
    });
    console.log({ user });
    // Cleanup
    return () => unsubscribe();
  }, [navigate]);
  return (
    <AuthContext.Provider value={user}>
      {isLoading ? (
        <Spin className="flex h-screen items-center justify-center" />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
