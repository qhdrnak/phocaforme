package com.phofor.phocaforme.notification.repository;

import com.phofor.phocaforme.notification.dto.message.NotificationMessageDto;
import com.phofor.phocaforme.notification.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FirebaseCloudMessageRepository extends JpaRepository<NotificationEntity, Integer> {

    List<NotificationEntity> findByUserEntity_UserId(@Param("userId") String userId);
}
