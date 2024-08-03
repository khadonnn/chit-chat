import React, { useContext, useMemo } from 'react';
import { Collapse, Typography, Button, Avatar } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import useFirestore from '../../hooks/useFirestore.js';
import { AuthContext } from '../../Context/AuthProvider';

export default function RoomList() {
  const { uid } = useContext(AuthContext);
  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore('rooms', roomCondition);
  console.log({ rooms });

  const collapseItems = [
    {
      key: '1',
      label: 'Room',
      children: (
        <div>
          {rooms.map((room) => {
            const avatarText = room.name ? room.name.charAt(0).toUpperCase() : '?';
            return (
              <div key={room.id} className="flex items-center border p-2">
                <Avatar>{avatarText}</Avatar>
                <Typography.Link style={{ marginLeft: '8px' }}>{room.name}</Typography.Link>
              </div>
            );
          })}

          <Button icon={<PlusSquareOutlined />} type="text" className="flex-between flex">
            Add
          </Button>
        </div>
      ),
    },
  ];
  return <Collapse ghost defaultActiveKey={['1']} items={collapseItems} />;
}
