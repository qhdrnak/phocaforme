package com.phofor.phocaforme.board.service.query.filters;

import co.elastic.clients.elasticsearch._types.query_dsl.*;

import java.util.ArrayList;
import java.util.List;

public class TitleFilter {

    public static Query createFilter(String title){
        BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder();
        String[] keywords = title.split("\\s+");
        List<Query> queryList = new ArrayList<>();
        for(String keyword : keywords) {
            QueryVariant matchTitleQuery = new MultiMatchQuery.Builder()
                    .query(keyword)
//                    .fuzziness("1")
                    .fields("keyword1","keyword2","keyword3")
                    .type(TextQueryType.CrossFields)
                    .build();
            queryList.add(new Query(matchTitleQuery));
        }
        boolQueryBuilder.should(queryList);
        boolQueryBuilder.minimumShouldMatch("3");
        return new Query(boolQueryBuilder.build());
    }
}
