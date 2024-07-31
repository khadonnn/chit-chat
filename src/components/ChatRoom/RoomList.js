import React from 'react';
import { Collapse, Typography, Button, Avatar } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const collapseItems = [
  {
    key: '1',
    label: 'Room',
    children: (
      <div>
        <div className="flex items-center rounded-lg border border-gray-300 p-2">
          <Avatar className="mr-3">A</Avatar>
          <Typography.Link>Room 1</Typography.Link>
        </div>
        <div className="flex items-center border p-2">
          <Avatar className="mr-3">B</Avatar>
          <Typography.Link>Room 2</Typography.Link>
        </div>
        <div className="flex items-center border p-2">
          <Avatar className="mr-3">C</Avatar>
          <Typography.Link>Room 3</Typography.Link>
        </div>

        <Button icon={<PlusSquareOutlined />} type="text" className="flex-between flex">
          Add
        </Button>
      </div>
    ),
  },
];

export default function RoomList() {
  return <Collapse ghost defaultActiveKey={['1']} items={collapseItems} />;
}
