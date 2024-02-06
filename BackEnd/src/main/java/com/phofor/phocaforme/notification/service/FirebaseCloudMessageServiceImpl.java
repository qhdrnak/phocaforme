package com.phofor.phocaforme.notification.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.phofor.phocaforme.notification.dto.FcmMessage;
import com.phofor.phocaforme.notification.dto.NotificationMessageDto;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class FirebaseCloudMessageServiceImpl implements FirebaseCloudMessageService{

    private final FirebaseCloudMessageRepository firebaseCloudMessageRepository;
    private final String API_URL = "https://fcm.googleapis.com/v1/projects/" +
            "phocaforme/messages:send";
    private final ObjectMapper objectMapper;

    // 알림 리스트
    @Override
    public List<NotificationMessageDto> getMessageList(String userId) {
        return firebaseCloudMessageRepository.findAllMessagesByUserId(userId);
    }

    @Override
    public void sendMessageTo(String targetToken, String title, String body, String link) throws IOException {
        String message = makeMessage(targetToken, title, body, link);

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