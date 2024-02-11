package com.phofor.phocaforme.board.controller;

import com.phofor.phocaforme.auth.domain.CustomOAuth2User;
import com.phofor.phocaforme.auth.entity.UserEntity;
import com.phofor.phocaforme.board.dto.BarterDetailDto;
import com.phofor.phocaforme.board.dto.BarterRegisterDto;
import com.phofor.phocaforme.board.dto.BarterUpdateDto;
import com.phofor.phocaforme.board.dto.IdolMemberDto;
import com.phofor.phocaforme.board.dto.searchDto.request.SearchRequest;
import com.phofor.phocaforme.board.dto.searchDto.response.SearchResponse;
import com.phofor.phocaforme.board.entity.Barter;
import com.phofor.phocaforme.board.service.BarterSearchService;
import com.phofor.phocaforme.board.service.BarterService;
import com.phofor.phocaforme.notification.service.FCMNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/barter")
@RequiredArgsConstructor
public class BarterController {
    private final BarterSearchService barterSearchService;
    private final BarterService barterService;
    private final FCMNotificationService fcmNotificationService;

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
        Barter barter = barterService.registerBarter(registerDto, userEntity);
        List<IdolMemberDto> idols = barter.getOwnIdols().stream().map(
                ownIdol -> new IdolMemberDto(
                        ownIdol.getIdolMember().getId(), ownIdol.getIdolMember().getName()
                )).toList();
        List<String> ids = barterSearchService.wishPhoca(barter.getTitle(),idols);
//        //#주석 해제해서 사용
        fcmNotificationService.sendBiasMessage(ids,barter.getId());
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