package com.phofor.phocaforme.board.controller;

import com.phofor.phocaforme.auth.domain.CustomOAuth2User;
import com.phofor.phocaforme.auth.entity.UserEntity;
import com.phofor.phocaforme.auth.service.redis.RedisService;
import com.phofor.phocaforme.board.dto.BarterDetailDto;
import com.phofor.phocaforme.board.dto.BarterRegisterDto;
import com.phofor.phocaforme.board.dto.BarterUpdateDto;
import com.phofor.phocaforme.board.dto.queueDTO.PostMessage;
import com.phofor.phocaforme.board.dto.searchDto.request.SearchRequest;
import com.phofor.phocaforme.board.dto.searchDto.response.SearchResponse;
import com.phofor.phocaforme.board.entity.Barter;
import com.phofor.phocaforme.board.entity.BarterImage;
import com.phofor.phocaforme.board.service.BarterSearchService;
import com.phofor.phocaforme.board.service.BarterService;
import com.phofor.phocaforme.board.service.rabbit.producer.PostPersistEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/barter")
@RequiredArgsConstructor
public class BarterController {
    private final BarterSearchService barterSearchService;
    private final BarterService barterService;


    @GetMapping
    public ResponseEntity<List<SearchResponse>> searchAll()
    {
        List<SearchResponse> results = barterSearchService.searchAll();
        return ResponseEntity.ok(results);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SearchResponse>> search(@Validated @ModelAttribute SearchRequest searchRequest)
    {
        System.out.println(searchRequest.getQuery());
        List<SearchResponse> results = barterSearchService.search(searchRequest);

        return ResponseEntity.ok(results);
    }



    // 상세게시글 나타내기
    @GetMapping("/{barterId}")
    public ResponseEntity<?> detailBarter(@PathVariable Long barterId) throws IOException {
        return new ResponseEntity<BarterDetailDto>(barterService.findOne(barterId), HttpStatus.OK);
    }
    
    // 게시글 등록
    @PostMapping
    public ResponseEntity<?> registerBarter(BarterRegisterDto registerDto, @AuthenticationPrincipal CustomOAuth2User oauth2User) throws IOException {
        // (HttpServletRequest request,)
        // String accessToken = CookieUtil.resolveToken(request).getValue();
        // CustomOAuth2User customOAuth2User = (CustomOAuth2User) redisService.getMapData(accessToken).get("oauth2User");
        // UserEntity userEntity = customOAuth2User.getUserEntity();
//        System.out.println(registerDto);
        UserEntity userEntity = oauth2User.getUserEntity();
        Barter barter = barterService.registerBarter(registerDto , userEntity);

        return new ResponseEntity<Barter>(barter, HttpStatus.OK);
    }

    // 게시글 수정
    @PutMapping("/{barterId}")
    public ResponseEntity<?> updateBarter(@PathVariable Long barterId, BarterUpdateDto updateDto, @AuthenticationPrincipal CustomOAuth2User oauth2User) throws IOException {
        barterService.update(oauth2User.getUserEntity(), barterId, updateDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 게시글 삭제
    @DeleteMapping("/{barterId}")
    public ResponseEntity<?> deleteBarter(@PathVariable Long barterId) throws IOException {
        barterService.delete(barterId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}