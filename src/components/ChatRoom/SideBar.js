import React from 'react';
import { Row, Col } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
const SideBar = () => {
  return (
    <Row className="relative flex w-full items-center justify-center">
      <div className="center absolute right-1/4 top-0 h-56 w-72 -rotate-45 bg-pink-100 blur-3xl filter"></div>
      <div className="center absolute right-1/4 top-5 h-56 w-48 -rotate-45 bg-blue-100 blur-3xl filter"></div>
      <div className="absolute left-4 top-1/2 h-72 w-52 -rotate-45 bg-purple-100 blur-3xl filter"></div>
      <div className="absolute left-32 top-1 h-72 w-52 -rotate-45 bg-orange-50 blur-3xl filter"></div>
      <div className="center absolute right-16 top-1/4 h-72 w-72 -rotate-45 bg-pink-100 blur-3xl filter"></div>
      <Col span={24}>
        <UserInfo />
      </Col>
      <Col span={24}></Col>
      <Col span={24}>
        <RoomList />
      </Col>
    </Row>
  );
};

export default SideBar;
