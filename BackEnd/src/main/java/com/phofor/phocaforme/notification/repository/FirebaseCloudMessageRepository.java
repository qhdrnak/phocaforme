package com.phofor.phocaforme.notification.repository;

import com.phofor.phocaforme.notification.dto.NotificationMessageDto;
import com.phofor.phocaforme.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FirebaseCloudMessageRepository extends JpaRepository<Notification, Integer> {

    List<NotificationMessageDto> findAllMessagesByUserId(@Param("userId") String userId);
}
