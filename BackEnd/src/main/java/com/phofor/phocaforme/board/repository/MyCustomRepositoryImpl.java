package com.phofor.phocaforme.board.repository;

import com.phofor.phocaforme.board.dto.searchDto.BarterDocument;
import com.phofor.phocaforme.wishcard.dto.WishDocument;
import lombok.AllArgsConstructor;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;


@AllArgsConstructor
public class MyCustomRepositoryImpl implements MyCustomRepository {

    private ElasticsearchOperations operations;

    @Override
    public SearchHits<BarterDocument> findByOptions(NativeQuery searchQuery) {
        return operations.search(searchQuery,BarterDocument.class);
    }

    @Override
    public SearchHits<WishDocument> findByTitleAndIdols(NativeQuery query) {
        return operations.search(query, WishDocument.class);
    }

//    public void func(){
//        IndexQuery indexQuery = new IndexQueryBuilder()
//                .withIndex("barter_post")
//                .
//    }
}
