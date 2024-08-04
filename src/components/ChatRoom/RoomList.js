import React, { useContext } from 'react';
import { Collapse, Typography, Button, Avatar } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvide';

export default function RoomList() {
  const {
    rooms = [],
    setIsAddRoomVisible,
    setSelectedRoomId,
  } = useContext(AppContext) || {};
  console.log({ rooms });
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  const collapseItems = [
    {
      key: '1',
      label: 'Room',
      children: (
        <div>
          {rooms.map((room) => {
            const avatarText = room.name
              ? room.name.charAt(0).toUpperCase()
              : '?';
            return (
              <div
                key={room.id}
                className="flex items-center border p-2"
                onClick={() => {
                  setSelectedRoomId(room.id);
                }}
              >
                <Avatar>{avatarText}</Avatar>
                <Typography.Link style={{ marginLeft: '8px' }}>
                  {room.name}
                </Typography.Link>
              </div>
            );
          })}

          <Button
            icon={<PlusSquareOutlined />}
            type="text"
            className="flex-between flex font-medium"
            onClick={handleAddRoom}
          >
            Thêm phòng
          </Button>
        </div>
      ),
    },
  ];
  return <Collapse ghost defaultActiveKey={['1']} items={collapseItems} />;
}
