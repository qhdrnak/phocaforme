package com.phofor.phocaforme.board.service.query.queryBuilder;

import com.phofor.phocaforme.board.dto.searchDto.criteria.BarterSearchCriteria;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;

public interface QueryBuilderInterface {
    void createQuery(BarterSearchCriteria criteria);

    NativeQuery getSearch();
}
