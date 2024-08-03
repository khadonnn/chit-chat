import React from 'react';
import { Form, Modal, Input } from 'antd';

export default function AddRoomModal() {
  const handleOk = () => {};
  const handleCancel = () => {};
  return (
    <Modal
      title="Tạo phòng"
      open={this.state.visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label="Ten phong" name="name">
          <Input placeholder="Nhap Ten Phong" />
        </Form.Item>
        <Form.Item label="Mo ta" name="name">
          <Input.TextArea placeholder="Nhap Ten Phong" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
