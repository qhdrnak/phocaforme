package com.phofor.phocaforme.notification.service;

import com.phofor.phocaforme.notification.dto.NotificationDto;
import com.phofor.phocaforme.notification.dto.message.NotificationMessageDto;
import com.phofor.phocaforme.notification.dto.message.RequestDTO;
import com.phofor.phocaforme.notification.entity.NotificationEntity;

import java.io.IOException;
import java.util.List;

public interface FirebaseCloudMessageService {
    public void sendMessageTo(RequestDTO requestDTO) throws IOException;

    public Boolean sendMessage(NotificationDto chatNotificationDto);

    public List<NotificationMessageDto> getMessageList(String userId);
}
