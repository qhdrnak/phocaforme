package com.phofor.phocaforme.board.dto;

import com.phofor.phocaforme.board.entity.Barter;
import com.phofor.phocaforme.board.entity.BarterFindIdol;
import com.phofor.phocaforme.board.entity.BarterImage;
import com.phofor.phocaforme.board.entity.BarterOwnIdol;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
public class BarterDetailDto {
    // 게시글 id
    private Long id;
    // 게시글 작성자 id
    private String userId;
    // 게시글 작성자 닉네임
    private String nickName;
    // 앨범명
    private String title;
    // 내용
    private String content;
    // 소유한 멤버(들)
    private List<Long> ownIdolMembers;
    // 찾는 멤버(들)
    private List<Long> findIdolMembers;
    // 포토카드 사진(들)
    private List<String> photos;
    // 카드 종류
    private String cardType;


    // Entity -> Dto 바꿔주는 메소드
    public static BarterDetailDto of(Barter barter) {
        return BarterDetailDto.builder()
                .id(barter.getId())
                .userId(barter.getUser().getUserId())
                .nickName(barter.getNickname())
                .title(barter.getTitle())
                .content(barter.getContent())
                .ownIdolMembers(barter.getOwnIdols().stream().map(BarterOwnIdol::getId).collect(Collectors.toList()))
                .findIdolMembers(barter.getFindIdols().stream().map(BarterFindIdol::getId).collect(Collectors.toList()))
                .photos(barter.getImages().stream().map(BarterImage::getImgCode).collect(Collectors.toList()))
                .cardType(barter.getCardType())
                .build();
    }
}