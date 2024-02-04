package com.phofor.phocaforme.chat.service;

import com.phofor.phocaforme.auth.domain.CustomOAuth2User;
import com.phofor.phocaforme.auth.service.redis.RedisService;
import com.phofor.phocaforme.chat.dto.response.ChatRoomResponseDto;
import com.phofor.phocaforme.chat.entity.ChatRoom;
import com.phofor.phocaforme.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true) // 한 사이클 안에서 디비 관리해주는거
// 터지면 이제 아무것도 안됨요
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService{

    private final ChatRoomRepository chatRoomRepository;
    private final RedisService redisService;
    //CustomOAuth2User customOAuth2User = (CustomOAuth2User) redisService.getMapData(accessToken).get("oauth2User");
//        UserEntity userEntity = customOAuth2User.getUserEntity();
//        String userId = userEntity.getUserId();
//        String userName = userEntity.getUserName();
//        log.info(userName);

    // 채팅방 내역 조회
    @Override
    public List<ChatRoomResponseDto> getAllByOwnerIdOrVisiterId(CustomOAuth2User customOAuth2User) {
        String myId = customOAuth2User.getUserEntity().getUserId();
        log.info(myId);
        List<ChatRoomResponseDto> allChatRoomDto = new ArrayList<>();
        for (ChatRoom c : chatRoomRepository.findAllByOwnerIdOrVisiterId(myId, myId)) {
            allChatRoomDto.add(ChatRoomResponseDto.of(c));
        }
        return allChatRoomDto;
    }

    // 채팅방 만들기
    @Override
    @Transactional
    public ChatRoomResponseDto getChatRoomByBoardIdAndVisiterId(Integer boardId, String userId){
        ChatRoom chatRoom = chatRoomRepository.findChatRoomByBoardIdAndVisiterId(boardId, userId);
        // 나중에 게시글이 생기면 사용할 수 있어요~~
//        private final BartarRepository bartarRepository;
//        Barter barter = bartarRepository.findById(boardId);
        System.out.println("chatRoom = " + chatRoom);
        
        if(chatRoom==null){ // 해당하는 채팅방이 없을 경우 새로 만들어주기
            // save
            // ChatRoomResponseDto chatRoomResponseDto = new ChatRoomResponseDto(chatRoomRequestDto);

            ChatRoom saveChatRoom = ChatRoom.builder()
                    .boardId(boardId)
                    .boardTitle("저 마크 가지고 싶어요")
                    .ownerId("애옹이")
                    .visiterId(userId)
                    .build();

//            ChatRoom saveChatRoom = ChatRoom.builder()
//                    .boardId(chatRoomRequestDto.getBoardId())
//                    .boardTitle(chatRoomRequestDto.getBoardTitle())
//                    .ownerId(chatRoomRequestDto.getOwnerId())
//                    .visiterId(chatRoomRequestDto.getVisiterId())
//                    .build();
            chatRoom = chatRoomRepository.save(saveChatRoom);
        }
        ChatRoomResponseDto singleChatRoomDto = ChatRoomResponseDto.of(chatRoom);
        return singleChatRoomDto;
    }
}
