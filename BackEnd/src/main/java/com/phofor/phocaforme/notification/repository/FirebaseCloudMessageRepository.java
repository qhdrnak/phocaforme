package com.phofor.phocaforme.notification.repository;

import com.phofor.phocaforme.notification.dto.message.NotificationMessageDto;
import com.phofor.phocaforme.notification.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FirebaseCloudMessageRepository extends JpaRepository<NotificationEntity, Integer> {

    @Query("SELECT new com.phofor.phocaforme.notification.dto.message.NotificationMessageDto" +
                    "(n.notificationId, n.content, n.createdAt, n.readStatus, n.notificationType, n.articleId" +
                    ") FROM NotificationEntity n WHERE n.userEntity.userId = :userId"
    )
    List<NotificationMessageDto> findByUserEntity_UserId(@Param("userId") String userId);
}
