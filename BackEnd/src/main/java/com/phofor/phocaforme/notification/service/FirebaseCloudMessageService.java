package com.phofor.phocaforme.notification.service;

import com.phofor.phocaforme.notification.dto.NotificationMessageDto;

import java.io.IOException;
import java.util.List;

public interface FirebaseCloudMessageService {
    public void sendMessageTo(String targetToken, String title, String body, String link) throws IOException;

    public List<NotificationMessageDto> getMessageList(String userId);
}
