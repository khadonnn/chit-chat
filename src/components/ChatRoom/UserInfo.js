import React, { useContext } from 'react';
import { Button, Avatar, Typography, Divider } from 'antd';
import logo from '../../img/logo.png';

import { db } from '../../firebase/config';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config.js';

import { AuthContext } from '../../Context/AuthProvider';
const UserInfo = () => {
  const { displayName, photoURL } = useContext(AuthContext);
  return (
    <div>
      <div className="flex justify-between">
        <img src={logo} alt="logo" className="aspect-w-16 aspect-h-9 w-16" />
        <Button
          className="mr-5 mt-3 border-blue-500 bg-gradient-to-r from-pink-200 via-pink-100 to-amber-100 font-medium text-slate-700"
          type="primary"
          onClick={() => signOut(auth)}
        >
          Đăng xuất
        </Button>
      </div>
      <Divider style={{ width: '100%' }} />
      <div className="ml-4 mt-4 flex items-center">
        <Avatar className="mr-3" size="large" src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="text-base font-semibold">
          {displayName}
        </Typography.Text>
      </div>
    </div>
  );
};

export default UserInfo;
