package com.phofor.phocaforme.auth.config.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

/**
 * 에러 헨들러
 * 로그인이 되어 있는 상태가 아닐때 보안으로 연결된 페이지로 가면 이 페이지로 넘어감
 * 여기서는 로그인 페이지로 가게 만듬
 */

@Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        // 여기에 인증 실패 시 실행할 로직을 작성
        // 예: response.sendRedirect("/login"); 또는 에러 메시지 전송
        log.error("error ----- {}",authException.getMessage());
        String errorURL = "/error?error=" + authException.getMessage();
        response.sendRedirect(errorURL);
//        response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied");
    }
}
