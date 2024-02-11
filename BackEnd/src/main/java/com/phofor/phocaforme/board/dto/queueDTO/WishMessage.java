package com.phofor.phocaforme.board.dto.queueDTO;

import lombok.*;

import java.io.Serializable;
import java.time.Instant;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class WishMessage implements Serializable {

    private static final long serialVersionUId = 1L;
    private Long articleId;
    private Instant createdAt;

}
