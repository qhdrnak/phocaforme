package com.phofor.phocaforme.board.dto.queueDTO;

import com.phofor.phocaforme.board.dto.searchDto.IdolSearchMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
public class PostMessage {
    private Long articleId;
    private String writerId;
    private String writerNickname;
    private String title;
    private String cardType;
    private String imageUrl;
    private String content;

    private List<IdolSearchMember> ownMember;

    private List<IdolSearchMember> targetMember;

    private boolean isBartered;
    private Instant createdAt;
}
