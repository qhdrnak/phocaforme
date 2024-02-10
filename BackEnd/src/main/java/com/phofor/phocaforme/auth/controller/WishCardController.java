package com.phofor.phocaforme.auth.controller;

import com.phofor.phocaforme.auth.domain.CustomOAuth2User;
import com.phofor.phocaforme.auth.entity.UserEntity;
import com.phofor.phocaforme.wishcard.dto.WishCardInfoDto;
import com.phofor.phocaforme.wishcard.service.WishCardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class WishCardController {

    private final WishCardService wishCardSelectService;

    // 갈망포카 등록
    @PutMapping("/user/wishCard")
    public ResponseEntity<?> registWishCard(@RequestBody WishCardInfoDto wishCardInfoDto,
                                            @AuthenticationPrincipal CustomOAuth2User oauth2User
                                            ) {
        log.info("Member Id : {}", wishCardInfoDto.getMemberId());
        log.info("Keyword : {}/{}/{}", wishCardInfoDto.getKeyword1(), wishCardInfoDto.getKeyword2(), wishCardInfoDto.getKeyword3());

        HttpStatus status;
        UserEntity userEntity = oauth2User.getUserEntity();
        if(wishCardSelectService.registWishCardByUserId(userEntity.getUserId(), wishCardInfoDto)) {
            status = HttpStatus.ACCEPTED;
        }
        else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(status);
    }
}
