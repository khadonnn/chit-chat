import React from 'react';
import { Avatar, Typography } from 'antd';
import { formatRelative } from 'date-fns';

export function formatDate(seconds) {
  let date = '';
  if (seconds) {
    date = formatRelative(new Date(seconds * 1000), new Date());
    date = date.charAt(0).toUpperCase() + date.slice(1);
  }
  return date;
}
export default function Message({ text, displayName, photoURL, createdAt }) {
  return (
    <div className="pb-4">
      <div>
        <Avatar size="small" src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="ml-2 font-medium">
          {displayName}
        </Typography.Text>
        <Typography.Text className="font-base ml-2 text-xs text-gray-500 text-opacity-50">
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div className="ml-8 mt-2">{text}</div>
    </div>
  );
}
