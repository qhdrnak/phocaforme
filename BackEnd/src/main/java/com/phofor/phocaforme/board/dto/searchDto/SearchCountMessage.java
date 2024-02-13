package com.phofor.phocaforme.board.dto.searchDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
@Getter
@Setter
@AllArgsConstructor
public class SearchCountMessage {

    private Long id;

    private Instant createdAt;
}
