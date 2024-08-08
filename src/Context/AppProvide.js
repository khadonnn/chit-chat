import React, { useMemo, useState, useContext, createContext } from 'react';

import { AuthContext } from './AuthProvider.js';
import useFirestore from '../hooks/useFirestore';

export const AppContext = createContext();

export default function AppProvide({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const { uid } = useContext(AuthContext);
  console.log({ uid });
  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    };
  }, [uid]);
  //rooms
  const rooms = useFirestore('rooms', roomCondition);
  console.log({ rooms });
  console.log({ roomCondition });

  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) || {};
  }, [rooms, selectedRoomId]);
  console.log({ selectedRoom });

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
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
