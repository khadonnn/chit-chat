import { UserAddOutlined } from '@ant-design/icons';
import React from 'react';
import { Button, Tooltip, Avatar, Divider, Form, Input } from 'antd';
import Message from './Message';
const ChatWindow = () => {
  return (
    <div className="h-[89vh]">
      <div className="headerStyle flex-end flex h-[56px] items-center justify-around">
        <div>
          <p className="font-medium">Room 1</p>
          <span>This is room</span>
        </div>
        <div className="flex items-center justify-center">
          <Button icon={<UserAddOutlined />}>Add Friend</Button>
          <Avatar.Group size="medium" max={{ count: 2 }}>
            <Tooltip title="A" placement="top">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="B">
              <Avatar>B</Avatar>
            </Tooltip>
            <Tooltip title="c">
              <Avatar>c</Avatar>
            </Tooltip>
            <Tooltip title="d">
              <Avatar>d</Avatar>
            </Tooltip>
          </Avatar.Group>
        </div>
      </div>
      <Divider className="flex-none" style={{ width: '100%' }} />
      <div className="messageStyle scrollbar-hide flex h-[calc(100%-56px)] flex-col justify-end overflow-y-auto p-3">
        <div className="message">
          <Message text="Test" photoURL={null} displayName="Kha" createAt={123} />
          <Message text="Test1" photoURL={null} displayName="Kha 1" createAt={124} />
          <Message text="Test2" photoURL={null} displayName="Kha 2" createAt={125} />
        </div>
        <Form className="formStyle flex">
          <Form.Item className="mr-2 flex-1">
            <Input placeholder="Nhap" autoComplete="off" />
          </Form.Item>
          <Button className="bg-blue-500 text-white" type="primary">
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChatWindow;
