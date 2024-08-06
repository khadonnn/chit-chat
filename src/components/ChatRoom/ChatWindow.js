import { UserAddOutlined } from '@ant-design/icons';
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../Context/AppProvide';

import { Button, Tooltip, Avatar, Divider, Form, Input, Alert } from 'antd';
import Message from './Message';
const ChatWindow = () => {
  const { members, selectedRoom, setIsInviteMemberVisible } =
    useContext(AppContext);
  // const selectedRoom = useMemo(() => {
  //   return rooms.find((room) => room.id === selectedRoomId);
  // }, [rooms, selectedRoomId]);

  return (
    <div className="h-[89vh]">
      {selectedRoom.id ? (
        <>
          <div className="headerStyle flex-end flex h-[56px] items-center justify-around">
            <div>
              <p className="font-medium">
                {selectedRoom?.name || 'Join to start'}
              </p>
              <span>{selectedRoom?.description || 'Have a good day 🔥'}</span>
            </div>
            <div className="flex items-center justify-center">
              <Button
                onClick={() => setIsInviteMemberVisible(true)}
                icon={<UserAddOutlined />}
              >
                Add Friend
              </Button>
              <Avatar.Group size="medium" max={{ count: 2 }}>
                {members.map((member) => (
                  <Tooltip
                    placement="top"
                    title={member.displayName}
                    key={member.id}
                  >
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ''
                        : member.displayName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          </div>
          <Divider className="flex-none" style={{ width: '100%' }} />
          <div className="messageStyle scrollbar-hide flex h-[calc(100%-56px)] flex-col justify-end overflow-y-auto p-3">
            <div className="message">
              <Message
                text="Test"
                photoURL={null}
                displayName="Kha"
                createAt={123}
              />
              <Message
                text="Test1"
                photoURL={null}
                displayName="Kha 1"
                createAt={124}
              />
              <Message
                text="Test2"
                photoURL={null}
                displayName="Kha 2"
                createAt={125}
              />
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
        </>
      ) : (
        <Alert
          message="Hãy thêm phòng hoặc chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </div>
  );
};

export default ChatWindow;
