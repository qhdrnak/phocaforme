package com.phofor.phocaforme.notification.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationMessageDto {
    private Long notificationId;
    private String content;
    private LocalDateTime createdAt;
    private String notificationType;
    private Long articleId;
}
