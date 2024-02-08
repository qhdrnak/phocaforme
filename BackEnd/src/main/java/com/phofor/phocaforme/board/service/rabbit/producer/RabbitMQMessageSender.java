package com.phofor.phocaforme.board.service.rabbit.producer;

import com.phofor.phocaforme.board.dto.queueDTO.PostMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RabbitMQMessageSender {

    private final RabbitTemplate rabbitTemplate;


    @Async // event 전달받은 순간 비동기적으로 별도 스레드에서 실행
    @EventListener
    public void handlePostPersistedEvent(PostPersistEvent event){
        PostMessage postMessage = (PostMessage) event.getSource();
        System.out.println(postMessage);
        rabbitTemplate.convertAndSend("hello.exchange","hello.key",postMessage);
        // rabbit에 직접 보내줌 -> 소비는 QueueWorker 클래스에서.
    }


}
