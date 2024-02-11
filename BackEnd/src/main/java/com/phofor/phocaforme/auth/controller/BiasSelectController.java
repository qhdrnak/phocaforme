package com.phofor.phocaforme.auth.controller;

import com.phofor.phocaforme.auth.domain.CustomOAuth2User;
import com.phofor.phocaforme.auth.service.user.UserService;
import com.phofor.phocaforme.auth.util.CookieUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Slf4j
@RequiredArgsConstructor
@Controller
public class BiasSelectController {

    private Cookie tokenCookie;
    private final UserService userService;

    // 최애 등록
    @PutMapping("/user/bias/{idolMemberId}")
    public ResponseEntity<?> updateBias(@PathVariable Long idolMemberId, HttpServletRequest request,
                                        @AuthenticationPrincipal CustomOAuth2User oauth2User) {

        String userId = oauth2User.getUserEntity().getUserId();
        HttpStatus staus;
        tokenCookie = CookieUtil.resolveToken(request);

        if (userService.updateBias(userId, idolMemberId)){
            staus = HttpStatus.ACCEPTED;
        } else {
            staus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(staus);
    }

//

//    @PutMapping()
//    public ResponseEntity<>
}
