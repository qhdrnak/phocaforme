package com.phofor.phocaforme.notification.controller;

import com.phofor.phocaforme.notification.dto.NotificationDto;
import com.phofor.phocaforme.notification.dto.message.RequestDTO;
import com.phofor.phocaforme.notification.entity.NotificationEntity;
import com.phofor.phocaforme.notification.service.FirebaseCloudMessageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class FCMNotificationApiController {

    private final FirebaseCloudMessageService firebaseCloudMessageService;

    // 알림 보내기
    @PostMapping("/notification/fcm")
    public ResponseEntity<?> pushMessage(@RequestBody RequestDTO requestDTO) throws IOException {
        log.info("requestDTO : {}, {}, {}", requestDTO.getTargetToken(),requestDTO.getTitle(), requestDTO.getBody());

        firebaseCloudMessageService.sendMessageTo(requestDTO);
        return ResponseEntity.ok().build();
    }
    // 알림 등록 및 알림 보내기
    @PostMapping("/notification/post")
    public ResponseEntity<?> postNotification(@RequestBody NotificationDto notificationDto) {
        HttpStatus httpStatus;
        log.info("chatNotificationDto : {}, {}, {}", notificationDto.getTitle(), notificationDto.getContent(), notificationDto.getLink());

        if(firebaseCloudMessageService.sendMessage(notificationDto)){
            log.info("성공");
            httpStatus = HttpStatus.OK;
        }
        else{
            log.info("실패");
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(httpStatus);
    }

    // 알림 리스트
    @GetMapping("/notification/{userId}")
    public ResponseEntity<?> getMessages(@PathVariable String userId) {
        List<NotificationEntity> notificationMessages = firebaseCloudMessageService.getMessageList(userId);

        // 서버 오류
        if(notificationMessages == null)
            return ResponseEntity.internalServerError().build();

        log.info("알림 개수: {}", notificationMessages.size());
        log.info("첫번째 알림: {}", notificationMessages.get(0).toString());
        return new ResponseEntity<>(notificationMessages, HttpStatus.OK);
    }
}
