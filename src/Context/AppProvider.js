import React, { useEffect, useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../firebase/config';
import { Spin } from 'antd';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { uid } = useContext(AuthContext);
  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore('rooms', roomCondition);
  console.log({ rooms });
  return <AppContext.Provider value={user}>{children}</AppContext.Provider>;
};

export default AppProvider;
