import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './NotificationModal.css';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const NotificationModal = ({ isOpen, onClose }) => {
  const user = useSelector(state => state.user.user);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const [notificationSupported, setNotificationSupported] = useState('Notification' in window);

  useEffect(() => {
    // 알림 권한 상태를 확인합니다.
    if (notificationSupported) {
      setNotificationPermission(Notification.permission);
    }
  }, [notificationSupported]);

  useEffect(() => {
    // 사용자가 로그인 상태이고, 알림 권한이 'granted' 상태이며, 알림이 지원되는 경우
    if (user.token && notificationPermission === 'granted' && notificationSupported) {
      initializeFirebaseAndRequestToken();
    }
  }, [user.token, notificationPermission, notificationSupported]);

  const requestNotificationPermissionAndToken = async () => {
    if (!notificationSupported) return;

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);

    if (permission === 'granted') {
      initializeFirebaseAndRequestToken();
    }
  };

  const initializeFirebaseAndRequestToken = () => {
    const firebaseConfig = {
      // Firebase 설정 값
      apiKey: "AIzaSyD-iDPmb0MyrFHqdEKVdaFs9V9vT4Rc-2w",
      authDomain: "phocaforme.firebaseapp.com",
      projectId: "phocaforme",
      storageBucket: "phocaforme.appspot.com",
      messagingSenderId: "250202437051",
      appId: "1:250202437051:web:14ab6bb0445aad9b08009e",
      measurementId: "G-9EZG3PJXLT"
    };
    initializeApp(firebaseConfig);

    const messaging = getMessaging();
    getToken(messaging).then((currentToken) => {
      if (currentToken) {
        // 토큰을 서버로 보냅니다.
        console.log("Device token:", currentToken);
        // sendTokenToServerBackend(currentToken); // 서버로 토큰 보내는 함수 구현 필요
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  };

  // 모달이 표시되어야 하는지 여부를 결정합니다.
  const shouldShowModal = isOpen && notificationSupported && notificationPermission !== 'granted';

  return shouldShowModal ? (
    <>
      <div className="noti-modal-backdrop" onClick={onClose}></div>
      <div className="noti-modal">
        <h2>알림 설정</h2>
        <p>알림을 받으시겠습니까?</p>
        <button onClick={() => requestNotificationPermissionAndToken()}>예</button>
        <button onClick={onClose}>아니오</button>
      </div>
    </>
  ) : null;
};

export default NotificationModal;
