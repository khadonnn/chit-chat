import { UserAddOutlined, SmileTwoTone } from '@ant-design/icons';
import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../Context/AppProvide';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '../../firebase/config';
import {
  Button,
  Tooltip,
  Avatar,
  Divider,
  Form,
  Input,
  Alert,
  notification,
} from 'antd';
import Message from './Message';
import { AuthContext } from '../../Context/AuthProvider';
import useFirestore from '../../hooks/useFirestore';
const ChatWindow = () => {
  const { members, selectedRoom, setIsInviteMemberVisible } =
    useContext(AppContext);
  const { uid, photoURL, displayName } = useContext(AuthContext);
  // const selectedRoom = useMemo(() => {
  //   return rooms.find((room) => room.id === selectedRoomId);
  // }, [rooms, selectedRoomId]);
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const messagesRef = collection(db, 'messages');
      const inputRef = await addDoc(messagesRef, {
        text: inputValue,
        uid,
        photoURL,
        roomId: selectedRoom.id,
        displayName,
        createdAt: serverTimestamp(),
      });
      console.log('inputrf', inputRef);
    } catch (error) {
      // console.error('Lỗi khi thêm phòng:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Tin nhắn không thành công.',
      });
    }
    form.resetFields(['message']);
  };
  const condition = useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );
  const messages = useFirestore('messages', condition);
  console.log('tin nhan', messages);
  return (
    <div className="h-[89vh]">
      {selectedRoom.id ? (
        <>
          <div className="headerStyle flex-end flex h-[56px] items-center justify-around">
            <div>
              <p className="text-xl font-medium">
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
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </div>
            <Form
              form={form}
              className="formStyle relative mb-3 flex items-center space-x-2"
            >
              <Form.Item name="message" className="relative m-0 flex-1">
                <div className="relative">
                  <Input
                    onChange={handleInputChange}
                    onPressEnter={handleSubmit}
                    placeholder="Nhập..."
                    autoComplete="off"
                  />
                  <SmileTwoTone className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl text-red-400 hover:rotate-12 hover:scale-110" />
                </div>
              </Form.Item>

              <Button
                className="flex-shrink-0 bg-blue-500 text-white"
                type="primary"
                onClick={handleSubmit}
              >
                Gửi
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
