package com.phofor.phocaforme.board.service;


import com.phofor.phocaforme.board.dto.searchDto.BarterDocument;
import com.phofor.phocaforme.board.dto.searchDto.criteria.BarterSearchCriteria;
import com.phofor.phocaforme.board.dto.searchDto.request.SearchRequest;
import com.phofor.phocaforme.board.dto.searchDto.response.SearchResponse;
import com.phofor.phocaforme.board.repository.BarterSearchRepository;
import com.phofor.phocaforme.board.service.criteria.BarterCriteriaBuilder;
import com.phofor.phocaforme.board.service.criteria.BarterCriteriaDirector;
import com.phofor.phocaforme.board.service.query.queryBuilder.QueryBuilder;
import lombok.AllArgsConstructor;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHitSupport;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchPage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@AllArgsConstructor
public class BarterSearchService {
    private final QueryBuilder queryBuilder;
    private final BarterSearchRepository barterSearchRepository;
//    private ElasticsearchOperations operations;
//    public Barter save(Barter barter){
//        return barterRepository.save(barter);
//    }

    public List<SearchResponse> search(SearchRequest searchRequest){

        /* A's target is B's own. So exchange them for search. */
        List<Long> temp = searchRequest.getOwn();
        searchRequest.setOwn(searchRequest.getTarget());
        searchRequest.setTarget(temp);
        System.out.println("target:"+searchRequest.getTarget());
        System.out.println("own:"+searchRequest.getOwn());

        /* Build Criteria for Query. */
        BarterCriteriaBuilder builder = new BarterCriteriaBuilder(searchRequest);
        BarterCriteriaDirector director = new BarterCriteriaDirector(builder);
        director.buildCriteria();
        BarterSearchCriteria criteria = director.getCriteria();

        /* Build Query by Criteria */
        queryBuilder.createQuery(criteria);
        NativeQuery searchQuery = queryBuilder.getSearch();

        /* Call repository method and Pagination */
        SearchHits<BarterDocument> searchHits = barterSearchRepository.findByOptions(searchQuery);
        SearchPage<BarterDocument> searchPage = SearchHitSupport.searchPageFor(
                searchHits,
                queryBuilder.getPageRequest()
        );
        System.out.println(">>> hits : "+searchPage.getSearchHits().getTotalHits());
        System.out.println(searchPage.getContent());
        /* SearchPage<Barter> -> List<SearchResponse> and Return */
        Iterator<SearchHit<BarterDocument>> iterator = searchPage.iterator();
        List<SearchResponse> results = new ArrayList<>();
        while(iterator.hasNext()){
            BarterDocument barter = iterator.next().getContent();
            System.out.println(barter.getOwnMember());
            results.add(new SearchResponse(
                    barter.getArticleId(),
                    barter.getImageUrl(),
                    barter.getTitle(),
                    barter.getOwnMember(),
                    barter.getTargetMember(),
                    barter.isBartered()
            ));
        }

        return results;
    }


//    public ResponseEntity<List<SearchResponse>> findByOptions(SearchRequest searchRequest) {
//        SearchResponse searchResponse = barterRepository.findByOptions(searchRequest);
//    }
}
