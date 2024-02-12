package com.phofor.phocaforme.wishcard.service;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import com.phofor.phocaforme.board.dto.IdolMemberDto;
import com.phofor.phocaforme.board.dto.searchDto.criteria.BarterSearchCriteria;
import com.phofor.phocaforme.board.service.query.filters.MemberIdFilter;
import com.phofor.phocaforme.board.service.query.filters.TitleFilter;
import com.phofor.phocaforme.board.service.query.queryBuilder.QueryBuilderInterface;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WishQueryBuilder implements QueryBuilderInterface {

    private final NativeQueryBuilder queryBuilder;

    public WishQueryBuilder(){
        this.queryBuilder = new NativeQueryBuilder();
    }

    @Override
    public NativeQuery getSearch() {
        return this.queryBuilder.build();
    }


    @Override
    public void createQuery(String title, List<IdolMemberDto> idols) {
        this.setFilters(title,idols);
    }

    private void setFilters(String title, List<IdolMemberDto> idols) {
        BoolQuery.Builder boolQueryBuilder = QueryBuilders.bool();
        boolQueryBuilder.must(MemberIdFilter.createFilter(idols));
        boolQueryBuilder.must(TitleFilter.createFilter(title));
        this.queryBuilder.withFields("user_id").withQuery(q -> q
                .bool(boolQueryBuilder.build())
        );
    }

    @Override
    public void createQuery(BarterSearchCriteria criteria) {

    }

}
