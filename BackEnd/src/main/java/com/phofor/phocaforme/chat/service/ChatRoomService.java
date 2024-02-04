package com.phofor.phocaforme.chat.service;

import com.phofor.phocaforme.auth.domain.CustomOAuth2User;
import com.phofor.phocaforme.chat.dto.response.ChatRoomResponseDto;

import java.util.List;

public interface ChatRoomService {

    // 방 있는지 체크해서 방 만들어주기
    ChatRoomResponseDto getChatRoomByBoardIdAndVisiterId(Integer boardId, String userId);
    // 유저의 채팅 내역 모두 가져오기
    List<ChatRoomResponseDto> getAllByOwnerIdOrVisiterId(CustomOAuth2User customOAuth2User);

    // 채팅방 만들기
//    @Transactional
//    ChatRoomResponseDto getChatRoomByBoardIdAndVisiterId(ChatRoomRequestDto chatRoomRequestDto, Integer boardId, String userId);
}
