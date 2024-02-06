package com.phofor.phocaforme.auth.controller;

import com.phofor.phocaforme.auth.domain.CustomOAuth2User;
import com.phofor.phocaforme.auth.service.redis.RedisService;
import com.phofor.phocaforme.auth.service.user.UserService;
import com.phofor.phocaforme.auth.util.CookieUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
public class CommonController {

    private final RedisService redisService;
    private final UserService userService;

    private Cookie tokenCookie;

    private final int time = (60*60*24*14) + (60*60*9);
    /**
     * 로그인
     * @return
     */
    @GetMapping("/auth/login")
    public String login() {
        return "login";
    }

    /**
     * 로그인 상태 유지 14일
     * @param request
     * @param response
     * @return
     */
    @GetMapping("/auth/login-status")
    public ResponseEntity<?> loginStatus(HttpServletRequest request, HttpServletResponse response) {
        HttpStatus status;
        tokenCookie = CookieUtil.resolveToken(request);
        String accessToken = tokenCookie.getValue();

        if(userService.modifyUserLoginStatus(accessToken)) {
            status = HttpStatus.ACCEPTED;
            tokenCookie.setMaxAge(time);
            log.info("쿠키 남은 시간: {}", tokenCookie.getMaxAge());
            tokenCookie.setPath("/");
            response.addCookie(tokenCookie);
        }
        else
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(status);
    }

    @GetMapping("/main")
    public String mainPage() {
        return "mainPage";
    }
    /**
     * 에러  페이지
     * @param error
     * @param model
     * @return
     */
    @GetMapping("/error")
    public String error(@RequestParam String error, Model model) {
        model.addAttribute("params", error);
        return "error";
    }
    /**
     * 메인 페이지
     * @return
     */
    @GetMapping("/")
    public String main(Model model, @AuthenticationPrincipal CustomOAuth2User oauth2User, HttpServletRequest request) {
        // 레디스 세션에서 사용
        log.info("user : {}", oauth2User.getUserEntity().getEmail());

        tokenCookie = CookieUtil.resolveToken(request);
        Map<String, Object> userData = redisService.getMapData(tokenCookie.getValue());

        model.addAttribute("userId", oauth2User.getUserEntity().getUserId());
        model.addAttribute("email", oauth2User.getUserEntity().getEmail());
        model.addAttribute("nickname", oauth2User.getUserEntity().getNickname());
        model.addAttribute("bias", oauth2User.getUserEntity().getBiasId());
        return "userInfo";
    }

    // 닉네임 중복 검사
    @PostMapping("/users/{userId}/nickname")
    public ResponseEntity<Map<String, Boolean>> nicknameIsDuplicated(@RequestParam String nickname){
        Map<String, Boolean> resultMap = new HashMap<>();
        HttpStatus status;
        Boolean isDuplicated = userService.isNicknameDuplicated(nickname);
        if(isDuplicated == null)
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        else{
            resultMap.put("isDuplicated", isDuplicated);
            status = HttpStatus.ACCEPTED;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    // 닉네임 변경
    @PutMapping("/users/{userId}/nickname")
    public ResponseEntity<?> modifyNickname(@RequestParam boolean isDuplicated, @PathVariable String userId,
                                            @RequestParam String nickname, HttpServletRequest request) {
        HttpStatus status;
        tokenCookie = CookieUtil.resolveToken(request);
        if(isDuplicated)
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        if(userService.modifyNicknameByUserId(userId, nickname, tokenCookie.getValue()))
            status = HttpStatus.ACCEPTED;
        else
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(status);
    }
}

