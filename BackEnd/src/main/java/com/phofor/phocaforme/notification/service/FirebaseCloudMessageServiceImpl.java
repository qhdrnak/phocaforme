package com.phofor.phocaforme.notification.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.phofor.phocaforme.auth.entity.UserDeviceEntity;
import com.phofor.phocaforme.auth.entity.UserEntity;
import com.phofor.phocaforme.auth.repository.UserDeviceRepository;
import com.phofor.phocaforme.auth.repository.UserRepository;
import com.phofor.phocaforme.notification.dto.NotificationDto;
import com.phofor.phocaforme.notification.dto.message.FcmMessage;
import com.phofor.phocaforme.notification.dto.message.NotificationMessageDto;
import com.phofor.phocaforme.notification.dto.message.RequestDTO;
import com.phofor.phocaforme.notification.entity.NotificationEntity;
import com.phofor.phocaforme.notification.entity.NotificationType;
import com.phofor.phocaforme.notification.repository.FirebaseCloudMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FirebaseCloudMessageServiceImpl implements FirebaseCloudMessageService{

    private final FirebaseCloudMessageRepository firebaseCloudMessageRepository;
    private final UserRepository userRepository;
    private final UserDeviceRepository userDeviceRepository;
    private final String API_URL = "https://fcm.googleapis.com/v1/projects/" +
            "phocaforme/messages:send";
    private final ObjectMapper objectMapper;

    // 알림 리스트
    @Override
    public List<NotificationMessageDto> getMessageList(String userId) {
        return firebaseCloudMessageRepository.findByUserEntity_UserId(userId);
    }

    // 메세지 등록 후 알림 등록
    @Override
    public Boolean sendMessage(NotificationDto notificationDto) {

        // 유저 정보 가져오기
        Optional<UserEntity> userEntityOptional = userRepository.findByUserId(notificationDto.getReceiverId());
        if (userEntityOptional.isPresent()) {
            UserEntity userEntity = userEntityOptional.get();
            log.info("user_id : {}", userEntity.getUserId());

            NotificationEntity notificationEntity;
            // 채팅인 경우
            if(notificationDto.getNotificationType() == NotificationType.Chatting) {
                notificationDto.setTitle("채팅 도착!");
                notificationDto.setContent(userEntity.getNickname() + "님 새로운 채팅이 왔어요!!");

                notificationEntity = NotificationEntity.builder()
                        .userEntity(userEntity)
                        .content(notificationDto.getContent()) // 알림 내용
                        .readStatus(false) // 읽지 않은 상태로 초기화
                        .notificationType(NotificationType.Chatting)
                        .build();
            }
            // 키워드 알림인 경우
            else {
                notificationDto.setTitle("갈망포카 출현!");
                notificationDto.setContent(userEntity.getNickname() + "님 새로운 갈망포카가 올라 왔어요!! 확인해보세요!!");

                notificationEntity = NotificationEntity.builder()
                        .userEntity(userEntity)
                        .content(notificationDto.getContent()) // 알림 내용
                        .readStatus(false) // 읽지 않은 상태로 초기화
                        .notificationType(NotificationType.Article) // 알림 유형 설정, 실제 유형으로 교체 필요
                        .articleId(notificationDto.getArticleId()) // 관련 글 ID, 필요한 경우 설정
                        .build();
            }
            // 데이터베이스에 저장
            firebaseCloudMessageRepository.save(notificationEntity);
        } else {
            log.info("User with id {} not found", notificationDto.getReceiverId());
            return false;
        }

        // 유저의 디바이스 정보 가져오기
        Optional<UserDeviceEntity> userDeviceEntityOptional = userDeviceRepository.findByUserId(notificationDto.getReceiverId());
        if (userDeviceEntityOptional.isPresent()) {
            UserDeviceEntity userDeviceEntity = userDeviceEntityOptional.get();

            try{
                // 메세지 보내기
                String message = makeMessage(
                        userDeviceEntity.getDeviceToken(), notificationDto.getTitle(),
                        notificationDto.getContent(), notificationDto.getLink()
                );

                OkHttpClient client = new OkHttpClient();
                RequestBody requestBody = RequestBody.create(message,
                        MediaType.get("application/json; charset=utf-8"));

                Request request = new Request.Builder()
                        .url(API_URL)
                        .post(requestBody)
                        .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                        .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                        .build();
                Response response = client.newCall(request).execute();

                System.out.println(response.body().string());

                return true;
            } catch (Exception e){
                log.info("request error");
                return false;
            }
        }
        else {
            log.info("UserDevice with id {} not found", notificationDto.getReceiverId());
            return false;
        }
    }

    // 메세지 보내기 테스트용
    @Override
    public void sendMessageTo(RequestDTO requestDTO) throws IOException {

        String message = makeMessage(
                requestDTO.getTargetToken(), requestDTO.getTitle(),
                requestDTO.getBody(), requestDTO.getLink()
        );

        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message,
                MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();

        Response response = client.newCall(request).execute();

        System.out.println(response.body().string());
    }

    private String makeMessage(String targetToken, String title, String body, String link) throws JsonProcessingException {
        // log.info(link); // 필요에 따라 로깅
        FcmMessage fcmMessage = FcmMessage.builder()
                .message(FcmMessage.Message.builder()
                        .token(targetToken)
                        .data(Map.of(
                                "title", title,
                                "body", body,
                                "link", link
                                // "image", "이미지_URL" // 이미지 URL을 추가할 경우
                        ))
                        .build())
                .validateOnly(false)
                .build();

        return objectMapper.writeValueAsString(fcmMessage);
    }

    private String getAccessToken() throws IOException {
        String firebaseConfigPath = "firebase/firebase_service_key.json";

        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }
}