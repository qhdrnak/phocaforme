package com.phofor.phocaforme.board.dto;

import com.ssafy.phofo.board.entity.Barter;
import com.ssafy.phofo.board.entity.BarterOwnIdol;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
public class BarterDetailDto {
    // 게시글 id
    private Long id;
    // 앨범이름 
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

    // 작성자 들어가야함

    public static BarterDetailDto of(Barter barter) {
        return BarterDetailDto.builder()
                .id(barter.getId())
                .title(barter.getTitle())
                .content(barter.getContent())
                .ownIdolMembers(barter.getOwnIdols().stream().map(BarterOwnIdol::getId).collect(Collectors.toList()))
//                .findIdolMembers(barter.getFindIdols().stream().map(BarterFindIdol::getId).collect(Collectors.toList()))
//                .photos(barter.getImages().stream().map(BarterImage::getImgCode).collect(Collectors.toList()))
                .cardType(barter.getCardType())
                .build();
    }
}