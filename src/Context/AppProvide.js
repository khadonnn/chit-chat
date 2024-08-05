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
  //rooms
  const rooms = useFirestore('rooms', roomCondition);
  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) || {};
  }, [rooms, selectedRoomId]);
  //member
  const userCondition = useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom]);
  const members = useFirestore('users', userCondition);
  console.log('thanh vien:', members);
  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
