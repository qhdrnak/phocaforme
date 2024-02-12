package com.phofor.phocaforme.auth.controller;

import com.phofor.phocaforme.auth.domain.CustomOAuth2User;
import com.phofor.phocaforme.auth.service.user.UserService;
import com.phofor.phocaforme.auth.util.CookieUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;


@Slf4j
@RequiredArgsConstructor
@Controller
public class BiasSelectController {

    private final UserService userService;

    // 최애 등록
    @PutMapping("/user/bias/{idolMemberId}")
    public ResponseEntity<?> updateBias(@PathVariable Long idolMemberId,
                                        HttpServletRequest request, HttpServletResponse response,
                                        @AuthenticationPrincipal CustomOAuth2User oauth2User) {

        String userId = oauth2User.getUserEntity().getUserId();
        HttpStatus status;
        Cookie tokenCookie = CookieUtil.resolveToken(request);
        Cookie profileCookie = CookieUtil.resolveProfile(request);

        String profileURL = userService.updateBias(userId, idolMemberId, tokenCookie.getValue());
        if (!profileURL.isEmpty()){
            int time;
            if(profileCookie != null) {
                time = profileCookie.getMaxAge();
                log.info("시간 :{}", profileCookie.getMaxAge());

                // 기존 쿠키 지우기
                profileCookie.setMaxAge(0);
            }

            else{
                time = (60*60*3) + (60*60*9);
            }

            // 갱신
            String encodedValue = URLEncoder.encode(profileURL, StandardCharsets.UTF_8);
            Cookie newProfileCookie = new Cookie("profile", encodedValue);
            newProfileCookie.setPath("/");
            // 필요하다면 쿠키의 도메인 설정
            newProfileCookie.setMaxAge(time); // 쿠키 유효 시간 설정
            response.addCookie(newProfileCookie); // 쿠키를 응답에 추가
            status = HttpStatus.ACCEPTED;

        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(profileURL, status);
    }

//

//    @PutMapping()
//    public ResponseEntity<>
}
