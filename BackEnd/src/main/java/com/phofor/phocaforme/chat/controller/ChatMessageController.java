package com.phofor.phocaforme.chat.controller;

import com.phofor.phocaforme.chat.dto.request.ChatMessageRequestDto;
import com.phofor.phocaforme.chat.dto.response.ChatMessageResponseDto;
import com.phofor.phocaforme.chat.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatMessageController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatMessageService chatMessageService;

    @GetMapping("/chats/{chatRoomId}")
    public ResponseEntity<List<ChatMessageResponseDto>> getChatMessageAll(@PathVariable Integer chatRoomId){
        return ResponseEntity.ok().body(chatMessageService.getAllByChatRoomId(chatRoomId));
    }

    @MessageMapping("/chats/{chatRoomId}")  // 일단 이건 지금 이 상태가 맞음(별걸로 다 바꾸면 안되더라)
//    @SendTo("/topic/public/{chatRoomId}")
    @SendTo("/sub/chat/room{chatRoomId}")
    public ChatMessageResponseDto sendMessage(@DestinationVariable Integer chatRoomId,
                                              @Header("simpSessionAttributes") Map<String, Object> simpSessionAttributes,
                                              @Payload ChatMessageRequestDto chatMessageRequestDto) {
        log.info(chatMessageRequestDto.getMessage());
        return chatMessageService.save(chatMessageRequestDto, chatRoomId, simpSessionAttributes);
    }

    // 마지막 메시지 하나 들고오기
//    @GetMapping("/chat/{chatId}")
//    public ResponseEntity<ChatMessageResponseDto> (@PathVariable Integer chatId){
//        return ResponseEntity.ok().body(chatMessageService.get)
//    }
}