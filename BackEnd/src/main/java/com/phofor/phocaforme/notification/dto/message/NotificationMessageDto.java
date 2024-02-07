package com.phofor.phocaforme.notification.dto.message;


import com.phofor.phocaforme.notification.entity.NotificationType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationMessageDto {
    private Long notificationId;
    private String userId;
    private String content;
    private LocalDateTime createdAt;
    private NotificationType notificationType;
    private Long articleId;
    private Boolean readStatus;
}
