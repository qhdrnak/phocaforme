package com.phofor.phocaforme.board.service;


import com.phofor.phocaforme.board.dto.IdolMemberDto;
import com.phofor.phocaforme.board.dto.searchDto.BarterDocument;
import com.phofor.phocaforme.board.dto.searchDto.criteria.BarterSearchCriteria;
import com.phofor.phocaforme.board.dto.searchDto.request.SearchRequest;
import com.phofor.phocaforme.board.dto.searchDto.response.SearchResponse;
import com.phofor.phocaforme.board.repository.BarterSearchRepository;
import com.phofor.phocaforme.board.service.criteria.BarterCriteriaBuilder;
import com.phofor.phocaforme.board.service.criteria.BarterCriteriaDirector;
import com.phofor.phocaforme.board.service.query.queryBuilder.QueryBuilder;
import com.phofor.phocaforme.wishcard.dto.WishDocument;
import com.phofor.phocaforme.wishcard.service.WishQueryBuilder;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHitSupport;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchPage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class BarterSearchService {
    private final QueryBuilder queryBuilder;
    private final WishQueryBuilder wishQueryBuilder;
    private final BarterSearchRepository barterSearchRepository;

    public List<String> wishPhoca(String title, List<IdolMemberDto> idols){
        wishQueryBuilder.createQuery(title,idols);
        NativeQuery query = wishQueryBuilder.getSearch();
        System.out.println(query.getQuery());
        SearchHits<WishDocument> searchHits = barterSearchRepository.findByTitleAndIdols(query);
        SearchPage<WishDocument> searchPage = SearchHitSupport.searchPageFor(
                searchHits,
                null
        );
        Iterator<SearchHit<WishDocument>> iterator = searchPage.iterator();
        List<String> ids = new ArrayList<>();
        while(iterator.hasNext()) {
            WishDocument document = iterator.next().getContent();
            ids.add(document.getUserId());
        }
        return ids;
    }

    public List<SearchResponse> searchAll(){
        Sort sort = Sort.by(Sort.Direction.DESC, "created_at");
        Iterable<BarterDocument> iterable = barterSearchRepository.findAll(sort);
//        for (BarterDocument barterDocument : iterable) {
//            System.out.println(barterDocument);
//        }
        return StreamSupport.stream(iterable.spliterator(), false)
                .map(this::convertToSearchResponse)
                .collect(Collectors.toList());
    }

    public List<SearchResponse> search(SearchRequest searchRequest){

        /* A's target is B's own. So exchange them for search. */
        List<Long> temp = searchRequest.getOwn();
        searchRequest.setOwn(searchRequest.getTarget());
        searchRequest.setTarget(temp);
//        System.out.println("target:"+searchRequest.getTarget());
//        System.out.println("own:"+searchRequest.getOwn());

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


    private SearchResponse convertToSearchResponse(BarterDocument document) {
        // BarterDocument를 SearchResponse 객체로 변환하는 로직
        // 필요한 필드를 매핑하여 새로운 SearchResponse 객체 생성
        return new SearchResponse(
                document.getArticleId(),
                document.getImageUrl(),
                document.getTitle(),
                document.getOwnMember(), // 이 필드는 BarterDocument에 적절히 정의되어 있어야 함
                document.getTargetMember(), // 마찬가지로 BarterDocument에 정의되어 있어야 함
                document.isBartered()
        );
    }

//    public ResponseEntity<List<SearchResponse>> findByOptions(SearchRequest searchRequest) {
//        SearchResponse searchResponse = barterRepository.findByOptions(searchRequest);
//    }
}
