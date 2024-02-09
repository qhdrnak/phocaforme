package com.phofor.phocaforme.board.service.rabbit.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.phofor.phocaforme.board.dto.BarterDetailDto;
import com.phofor.phocaforme.board.service.BarterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QueueWorker {

    private final int BATCH_SIZE = 100; // TODO: application 파일로 이동
    private final String QUEUE_NAME = "hello.queue"; // TODO: application 파일로 이동
    private final RabbitTemplate rabbitTemplate;
    private final ElasticsearchBulkProcessor elasticsearchBulkProcessor;
    private final ObjectMapper objectMapper;
    private final BarterService barterService;
    @Scheduled(fixedDelay = 10000) // 10초 TODO: application 파일에 schedule delay값 두고 쓰기
    public void work() throws JsonProcessingException {
        log.info("Another 10secs...");
        log.info("Worker searching for messages....");
        List<BarterDetailDto> messages = new ArrayList<>();

        for(int i=0; i<BATCH_SIZE; i++){
            Message message = rabbitTemplate.receive(QUEUE_NAME);
            if(message==null){break;}
            String messageContent = new String(message.getBody(), StandardCharsets.UTF_8);
            log.info("Received message: " + messageContent);
            JsonNode rootNode = objectMapper.readTree(messageContent);
            Long articleId = rootNode.path("articleId").asLong();
            Boolean isBartered = rootNode.path("isBartered").asBoolean();

            BarterDetailDto barter = barterService.findOne(articleId);
            // 날짜 데이터 포맷팅

            messages.add(barter);
        }
        if(!(messages.isEmpty())){
            log.info("Spring : \"plz sync to elastic\"");
            elasticsearchBulkProcessor.processToElasticsearch(messages);
        }
    }


}
