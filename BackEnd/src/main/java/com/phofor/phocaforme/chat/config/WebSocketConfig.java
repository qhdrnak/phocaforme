package com.phofor.phocaforme.chat.config;

import com.phofor.phocaforme.chat.interceptor.ChatInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private  final ChatInterceptor chatInterceptor;
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        config.enableSimpleBroker("/sub");  // sub으로 들어오는 요청을 처리해주기 위해
        config.setApplicationDestinationPrefixes("/pub");   // pub으로 들어오는 요청을 처리해주기 위해
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*").withSockJS();
        // Endpoint 지정, setAllowedOriginPatterns("*")를 통해 요청 url 전부 허용
        // + withSockJs() 함수를 통해 ws, wss로 socket을 연결하는 것이 아닌 http, https로 socket을 연결하도롥 바꾸어줌
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration){
        registration.setMessageSizeLimit(50*1024*1024); // 메시지 크기 제한 오류 방지
        // (해당 코드가 없으면 byte code 보낼 때 소켓 연결이 끊길 수 있음)
    }

    @EventListener
    public void connectEvent(SessionConnectEvent sessionConnectEvent) {
        System.out.println(sessionConnectEvent);
        System.out.println("연결 성공 감지 !-!-!-!");
        // return "redirect:chat/message";
    }

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent sessionDisconnectEvent) {
        System.out.println(sessionDisconnectEvent);
        System.out.println("연결 끊어짐 감지 !-!-!-!");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(chatInterceptor);
    }
}








