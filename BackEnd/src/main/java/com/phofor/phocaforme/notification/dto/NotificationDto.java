package com.phofor.phocaforme.notification.dto;

import com.phofor.phocaforme.notification.entity.NotificationType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDto {
    private NotificationType notificationType; //알림 타입 
    private String senderId;    // 보낸 사람
    private String receiverId;  // 받은 사람
    private String title;   // 제목
    private String content; // 내용
    private String link;    // 링크
    private Long articleId;
}
