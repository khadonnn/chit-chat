import React, { useEffect } from 'react';
import { Button, Avatar, Typography } from 'antd';

import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config.js';
const UserInfo = () => {
  useEffect(() => {
    const usersCollection = collection(db, 'users');

    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log({ data, snapshot, doc: snapshot.docs });
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="flex justify-between">
      <div>
        <Avatar className="mr-1">A</Avatar>
        <Typography.Text className="font-medium">Kha</Typography.Text>
      </div>
      <Button
        className="border-blue-500 bg-gradient-to-r from-pink-200 via-pink-100 to-amber-100 font-medium text-slate-700"
        type="primary"
        onClick={() => signOut(auth)}
      >
        Dang xuat
      </Button>
    </div>
  );
};

export default UserInfo;
