import React, { useContext, useState, useMemo } from 'react';
import { Form, Modal, Divider, Select, Spin, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { AppContext } from '../../Context/AppProvide';
import { AuthContext } from '../../Context/AuthProvider';
import { db } from '../../firebase/config';

import debounce from 'lodash/debounce';

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
const { Option } = Select;
function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  const [fectching, setFectching] = useState(false);
  const [options, setOptions] = useState([]);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFectching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFectching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);
  return (
    <Select
      labelInValue
      //fix loi label, value
      optionLabelProp="children"
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fectching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Option value={opt.value} title={opt.label} key={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0).toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Option>
      ))}
    </Select>
  );
}
//fetch user name
const fetchUserList = async (search, curMembers) => {
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('keywords', 'array-contains', search),
    orderBy('displayName'),
    limit(20)
  );
  try {
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map((doc) => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }));
    return users.filter((opt) => !curMembers.includes(opt.value));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const { uid } = useContext(AuthContext);
  const [value, setValue] = useState([]);
  // console.log({ uid });
  const [form] = Form.useForm();
  const handleOk = async () => {
    // Reset form values
    form.resetFields();
    setValue([]);

    try {
      // Reference to the room document
      const roomRef = doc(db, 'rooms', selectedRoomId);

      // Update the members field in the room document
      await updateDoc(roomRef, {
        members: [...selectedRoom.members, ...value.map((val) => val.value)],
      });

      // Close the modal
      setIsInviteMemberVisible(false);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  const handleCancel = () => {
    form.resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  };
  return (
    <Modal
      title="Mời thành viên"
      open={isInviteMemberVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Divider style={{ margin: '8px 0', borderColor: '#dcdcdc' }} />
      <Form form={form} layout="vertical">
        <DebounceSelect
          mode="multiple"
          placeholder="Nhập tên"
          value={value}
          label="Tên các thành viên"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: '100%' }}
          curMembers={selectedRoom.members}
        />
      </Form>
    </Modal>
  );
}
