package com.phofor.phocaforme.board.controller;

import com.phofor.phocaforme.auth.domain.CustomOAuth2User;
import com.phofor.phocaforme.auth.entity.UserEntity;
import com.phofor.phocaforme.auth.service.redis.RedisService;
import com.phofor.phocaforme.board.dto.BarterDetailDto;
import com.phofor.phocaforme.board.dto.BarterRegisterDto;
import com.phofor.phocaforme.board.dto.BarterUpdateDto;
import com.phofor.phocaforme.board.service.BarterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

@RestController
@RequestMapping("/barter")
@RequiredArgsConstructor
public class BarterController {
    private final BarterService barterService;
    private final RedisService redisService;



//    @GetMapping
//    public ResponseEntity<?> findAll() throws IOException {
//        List<BarterThumbnailDto> dtos = barterService.findAll();
//        return new ResponseEntity<>(dtos, HttpStatus.OK);
//
//        Pageable pageable;
//        pageable.ge
//    }

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

        UserEntity userEntity = oauth2User.getUserEntity();
        Long barterId = barterService.registerBarter(registerDto , userEntity);
        return new ResponseEntity<Long>(barterId, HttpStatus.OK);
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