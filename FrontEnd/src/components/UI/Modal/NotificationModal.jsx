import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './NotificationModal.css';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const NotificationModal = ({ isOpen, onClose, onNotificationSelect }) => {
  const user = useSelector(state => state.user.user);
  const [notificationPermission, setNotificationPermission] = useState(null);
  const [notificationSupported, setNotificationSupported] = useState(false);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  useEffect(() => {
    if (user.token && notificationPermission === 'granted' && notificationSupported) {
      initializeFirebase();
    }
  }, [user.token, notificationPermission, notificationSupported]);

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setNotificationSupported(true);
      setNotificationPermission(Notification.permission);
    } else {
      console.log('This browser does not support desktop notification');
      setNotificationSupported(false);
    }
  };

  const handleNotificationSelect = value => {
    if (value && notificationSupported && notificationPermission !== 'granted') {
      requestNotificationPermission();
    } else {
      onClose(); // If already granted or not supported, just close the modal
    }
  };

  const initializeFirebase = () => {
    const firebaseConfig = {
      // Your Firebase configuration
    };
    initializeApp(firebaseConfig);
    requestNotificationPermission();
  };

  const requestNotificationPermission = () => {
    Notification.requestPermission().then(permission => {
      setNotificationPermission(permission);
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const messaging = getMessaging();
        sendTokenToServer(messaging);
        onClose(); // Close modal after getting permission
      }
    });
  };

  const sendTokenToServer = (messaging) => {
    getToken(messaging)
      .then((currentToken) => {
        console.log("device_token: " + currentToken);
        // Send the token to your server
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

  // Render the modal based on certain conditions
  if (!user.token || !isOpen || !notificationSupported || notificationPermission === 'granted') {
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
