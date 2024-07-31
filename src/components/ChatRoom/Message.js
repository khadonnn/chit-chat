import React from 'react';
import { Avatar, Typography } from 'antd';

export default function Message({ text, displayName, photoURL, createAt }) {
  return (
    <div className="pb-4">
      <div>
        <Avatar size="small" src={photoURL}>
          A
        </Avatar>
        <Typography.Text className="ml-2 font-medium">{displayName}</Typography.Text>
        <Typography.Text className="ml-2 font-medium text-gray-500 text-opacity-50">{createAt}</Typography.Text>
      </div>
      <div>{text}</div>
    </div>
  );
}
