import React from 'react';

const NotificationModal = ({ onClose, onNotificationSelect }) => {
  const handleNotificationSelect = (value) => {
    onNotificationSelect(value);
    onClose();
  };

  return (
    <div className="modal">
      <h2>알림 설정</h2>
      <p>알림을 받으시겠습니까?</p>
      <button onClick={() => handleNotificationSelect(true)}>예</button>
      <button onClick={() => handleNotificationSelect(false)}>아니오</button>
    </div>
  );
};

export default NotificationModal;