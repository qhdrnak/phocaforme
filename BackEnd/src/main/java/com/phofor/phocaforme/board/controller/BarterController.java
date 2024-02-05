package com.phofor.phocaforme.board.controller;

//import com.ssafy.phofo.auth.domain.CustomOAuth2User;
//import com.ssafy.phofo.auth.entity.UserEntity;
//import com.ssafy.phofo.auth.service.redis.RedisService;
//import com.ssafy.phofo.auth.util.CookieUtil;

import com.ssafy.phofo.board.dto.BarterDetailDto;
import com.ssafy.phofo.board.dto.BarterRegisterDto;
import com.ssafy.phofo.board.dto.BarterUpdateDto;
import com.ssafy.phofo.board.service.BarterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/barter")
@RequiredArgsConstructor
public class BarterController {
    private final BarterService barterService;
//    private final RedisService redisService;



//    @GetMapping
//    public ResponseEntity<?> findAll() throws IOException {
//        List<BarterThumbnailDto> dtos = barterService.findAll();
//        return new ResponseEntity<>(dtos, HttpStatus.OK);
//
//        Pageable pageable;
//        pageable.ge
//    }

    @GetMapping("/{barterId}")
    public ResponseEntity<?> detailBarter(@PathVariable Long barterId) throws IOException {
        return new ResponseEntity<BarterDetailDto>(barterService.findOne(barterId), HttpStatus.OK);
    }

    // , HttpServletRequest request, @AuthenticationPrincipal CustomOAuth2User oauth2User
    // 작성자 안 넣어서 작성자 넣어야해요
    @PostMapping
    public ResponseEntity<?> registerBarter(BarterRegisterDto registerDto) throws IOException {
        // String accessToken = CookieUtil.resolveToken(request).getValue();
        // CustomOAuth2User customOAuth2User = (CustomOAuth2User) redisService.getMapData(accessToken).get("oauth2User");
//        UserEntity userEntity = oauth2User.getUserEntity();
//                // customOAuth2User.getUserEntity();
//        System.out.println(userEntity.getUserId());

        Long barterId = barterService.registerBarter(registerDto);

        return new ResponseEntity<Long>(barterId, HttpStatus.OK);
    }

    @PutMapping("/{barterId}")
    public ResponseEntity<?> updateBarter(@PathVariable Long barterId, BarterUpdateDto updateDto) throws IOException {
        barterService.update(barterId, updateDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{barterId}")
    public ResponseEntity<?> deleteBarter(@PathVariable Long barterId) throws IOException {
        barterService.delete(barterId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}