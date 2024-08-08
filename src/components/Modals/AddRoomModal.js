import React, { useContext } from 'react';
import { Form, Modal, Input, Divider, notification } from 'antd';
import { AppContext } from '../../Context/AppProvide';
import { AuthContext } from '../../Context/AuthProvider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { uid } = useContext(AuthContext);

  // console.log({ uid });
  const [form] = Form.useForm();
  const handleOk = async () => {
    try {
      const formData = form.getFieldsValue();

      await addDoc(collection(db, 'rooms'), {
        ...formData,
        members: [uid],
        createdAt: serverTimestamp(),
      });
      console.log({ formData });

      notification.success({
        message: 'Thành công',
        description: 'Phòng đã được thêm thành công.',
      });
      form.resetFields();
      setIsAddRoomVisible(false);
    } catch (error) {
      // console.error('Lỗi khi thêm phòng:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Đã xảy ra lỗi khi thêm phòng.',
      });
    }
  };
  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  return (
    <Modal
      title="Tạo phòng"
      open={isAddRoomVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Divider style={{ margin: '8px 0', borderColor: '#dcdcdc' }} />
      <Form form={form} layout="vertical">
        <Form.Item label="Tên phòng" name="name">
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
