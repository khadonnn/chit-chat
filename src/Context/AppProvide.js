import React, {
  useEffect,
  useMemo,
  useState,
  useContext,
  createContext,
} from 'react';

import { AuthContext } from './AuthProvider.js';
import useFirestore from '../hooks/useFirestore.js';

export const AppContext = createContext();

export default function AppProvide({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const { uid } = useContext(AuthContext);

  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore('rooms', roomCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
