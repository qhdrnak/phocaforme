package com.phofor.phocaforme.board.dto.searchDto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchRequest {
    private Integer page = 1;
    private Integer size = 10;

    private String query;
    private String cardType;
    private List<Long> target;
    private List<Long> own;
}
