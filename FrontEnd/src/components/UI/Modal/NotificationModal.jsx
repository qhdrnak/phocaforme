import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './NotificationModal.css';
import { initializeApp } from 'firebase/app'; // Firebase 모듈 가져오기
import { getMessaging, getToken } from 'firebase/messaging'; // Firebase Messaging 모듈 가져오기


const NotificationModal = ({ isOpen, onClose, onNotificationSelect }) => {
  const user = useSelector(state => state.user.user);
  const [notificationPermission, setNotificationPermission] = useState(null);
  const [notificationSupported, setNotificationSupported] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 알림 권한 상태 확인
    checkNotificationPermission();
    
  }, []);

  useEffect(() => {
    // 사용자가 로그인 상태가 바뀔 때마다 모달을 열거나 푸시 토큰을 서버로 보냅니다.
    if (user.token && notificationPermission === 'granted') {
      // 모달을 열지 않고 바로 푸시 토큰을 서버로 보냅니다.
      initializeFirebase();
    }
  }, [user.token, notificationPermission]);

  const checkNotificationPermission = () => {
    if ('Notification' in window ) {
      setNotificationSupported(true)
      if (Notification.permission === 'default') {
        setNotificationPermission(null); // 권한 요청 전
      } else {
        setNotificationPermission(Notification.permission); // 권한 요청 후
      }
    } else {
      console.log('This broswer does not support desktop notification')
      setNotificationSupported(false)
    }
  }

  const handleNotificationSelect = value => {
    onNotificationSelect(value);
    if (value) {
      initializeFirebase();
    }
    onClose();  // 모달을 닫습니다.
  };

  const initializeFirebase = () => {
    const firebaseConfig = {
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

    if (notificationPermission !== 'granted') {
      requestNotificationPermission(messaging);
    } else {
      // 이미 허용된 상태라면 바로 토큰 발급
      sendTokenToServer(messaging);
    }
  };

  const requestNotificationPermission = (messaging) => {
    // 사용자에게 알림 권한 요청
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        setNotificationPermission(permission);
        sendTokenToServer(messaging);
      } else if (permission === 'denied') {
        console.log('Notification permission denied.');
        setNotificationPermission(permission);
      }
    });
  };

  const sendTokenToServer = (messaging) => {
    getToken(messaging)
      .then((currentToken) => {
        console.log("device_token: " + currentToken);
        sendTokenToServerBackend(currentToken);
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

  const sendTokenToServerBackend = (currentToken) => {
    fetch(process.env.REACT_APP_API_URL + `user/device`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        deviceToken: currentToken,
      }),
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      console.log('푸시 토큰을 서버로 전송했습니다.');
    })
    .catch(error => {
      console.error('푸시 토큰을 서버로 전송하는 중 오류 발생:', error);
    });
  };

  if (!user.token || !isOpen || notificationPermission === 'granted' || notificationPermission === 'denied') {
    return null;
  }


  return (
    <>
      <div className="noti-modal-backdrop" onClick={onClose}></div>
      <div className="noti-modal">
        <h2>알림 설정</h2>
        <p>알림을 받으시겠습니까?</p>
        <button onClick={() => handleNotificationSelect(true)}>예</button>
        <button onClick={() => handleNotificationSelect(false)}>아니오</button>
       
      </div>
    </>
  );
};

export default NotificationModal;
