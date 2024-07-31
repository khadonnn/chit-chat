import React, { useEffect } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import app, { auth, db, storage, loginWithFacebook, onAuthStateChanged } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const { Title } = Typography;
const Login = () => {
  const navigate = useNavigate();

  const handleFbLogin = async () => {
    const result = await loginWithFacebook();
    if (result) {
      const { additionalUserInfo, user } = result;
      if (additionalUserInfo?.isNewUser) {
        try {
          await addDoc(collection(db, 'users'), {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
            createdAt: serverTimestamp(),
          });
          navigate('/');
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      } else {
        navigate('/login');
      }
    }
  };
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="center absolute right-1/3 top-3 h-60 w-56 -rotate-45 bg-pink-200 blur-3xl filter"></div>
      <div className="center absolute right-2/4 top-1/2 h-56 w-48 -rotate-45 bg-blue-100 blur-3xl filter"></div>
      <div className="absolute left-4 top-1/2 h-72 w-52 -rotate-45 bg-purple-100 blur-3xl filter"></div>
      <div className="absolute left-32 top-1 h-72 w-52 -rotate-45 bg-orange-100 blur-3xl filter"></div>
      <div className="center absolute right-16 top-1/4 h-72 w-72 -rotate-45 bg-pink-100 blur-3xl filter"></div>
      <Row className="relative w-full items-center justify-center bg-gray-50 px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg">
        <Col span={8}>
          <Title className="text-center" level={3}>
            LOGIN
          </Title>
          <Button className="mb-2 w-full">Login Google</Button>
          <Button className="mb-2 w-full" onClick={handleFbLogin}>
            Login FaceBook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
