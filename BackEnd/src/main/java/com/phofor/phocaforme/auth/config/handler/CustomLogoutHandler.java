package com.phofor.phocaforme.auth.config.handler;

import com.phofor.phocaforme.auth.service.redis.RedisService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import java.io.IOException;

/**
 * LogOutHandler 구현
 * 기존의 Handler를 커스텀하여 로그아웃 시 쿠키에 있는 Access Token을 찾아와
 * Redis에 저장된 정보(Key : Access Token, Value : Map<String, Object> UserData)를 제거
 * 쿠키 제거 후 로그아웃 로직 실행
 */

@Slf4j
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {

    // 클라이언트 아이디
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    String clientId;

    // 리다이렉트 URL
    @Value("${logout.redirect-url}")
    String redirectUrl;

    // 레디스 서비스
    private final RedisService redisService;
    private Cookie tokenCookie;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        // 쿠키에 저장된 access token 가져오기
        String accessToken = resolveToken(request);
        log.debug("[CustomLogoutHandler] - Access Token : {}", accessToken);

        // 로그아웃이 2번에 걸쳐서 진행됨
        if (accessToken != null) {
            log.debug("[CustomLogoutHandler] - 1차 로그아웃");
            // 레디스에 저장된 회원 데이터 지우기
            redisService.deleteMapData(accessToken);

            // 쿠키에 저장된 access token 지우기
            tokenCookie.setMaxAge(0);
            response.addCookie(tokenCookie);

            // 카카오 로그아웃 URL
            String kakaoLogoutUrl = "https://kauth.kakao.com/oauth/logout?client_id=" + clientId
                    + "&logout_redirect_uri=" + redirectUrl;

            // 클라이언트에게 JSON 형태로 리다이렉트 URL 전송
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            try {
                response.getWriter().write("{\"redirectUrl\": \"" + kakaoLogoutUrl + "\"}");
                response.getWriter().flush();
                response.getWriter().close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        else{
            log.debug("[CustomLogoutHandler] - 2차 로그아웃");
        }
    }

    // 쿠키에서 Access token 가져오기
    private String resolveToken(HttpServletRequest request) {
        String token = null;
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if("token".equals(cookie.getName())){
                    token = cookie.getValue();
                    tokenCookie = cookie;
                }
            }
        }
        return token;
    }
}
