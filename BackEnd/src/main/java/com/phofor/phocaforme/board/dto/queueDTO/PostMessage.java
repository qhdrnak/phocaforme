package com.phofor.phocaforme.board.dto.queueDTO;

import com.phofor.phocaforme.board.dto.searchDto.IdolSearchMember;
import lombok.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class PostMessage implements Serializable {

    private static final long serialVersionUId = 1L;

    private Long articleId;
    private boolean isBartered;
    private Instant createdAt;
}
