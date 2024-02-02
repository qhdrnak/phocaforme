package com.phofor.phocaforme.chat.dto.response;

import com.phofor.phocaforme.chat.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class ChatRoomResponseDto {  // 여기는 이미 디비에 반영이 된 시점
    private Integer chatRoomId; //
    private Integer boardId;    // 해당 교환 게시글id
    private String ownerId; // 게시글 작성자
    private String visiterId;   // 교환 희망자
    private String boardTitle;  // 게시글 제목
    private LocalDateTime createdAt;    // 채팅방 생성 날짜

//    public ChatRoomResponseDto(ChatRoomRequestDto chatRoomRequestDto) {
//        this.boardId = chatRoomRequestDto.getBoardId();
//        this.boardTitle = chatRoomRequestDto.getBoardTitle();
//        this.ownerId = chatRoomRequestDto.getOwnerId();
//        this.visiterId = chatRoomRequestDto.getVisiterId();
//    }

    // entity를 dto로 바꿔주겠어요
    // 위에 @Builder 붙여야함
    public static ChatRoomResponseDto of(ChatRoom chatroom){
        return ChatRoomResponseDto.builder()
                .chatRoomId(chatroom.getChatRoomId())
                .boardId(chatroom.getBoardId())
                .boardTitle(chatroom.getBoardTitle())
                .ownerId(chatroom.getOwnerId())
                .visiterId(chatroom.getVisiterId())
                .createdAt(chatroom.getCreatedAt())
                .build();
    }
}
