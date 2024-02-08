package com.phofor.phocaforme.board.service.rabbit.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.phofor.phocaforme.board.entity.Barter;
import com.phofor.phocaforme.board.repository.BarterRepository;
import com.phofor.phocaforme.board.service.rabbit.consumer.ElasticsearchBulkProcessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.time.Instant;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class QueueWorker {

    private final int BATCH_SIZE = 100; // TODO: application 파일로 이동
    private final String QUEUE_NAME = "hello.queue"; // TODO: application 파일로 이동
    private final RabbitTemplate rabbitTemplate;
    private final ElasticsearchBulkProcessor elasticsearchBulkProcessor;
    private final BarterRepository barterRepository;
    private final ObjectMapper objectMapper;

//    @Scheduled(fixedDelay = 3000) // 3초 TODO: application 파일에 schedule delay값 두고 쓰기
    public void work() throws JsonProcessingException {
        log.info("3초마다 스케쥴드");
        List<Barter> messages = new ArrayList<>();

        for(int i=0; i<BATCH_SIZE; i++){
            Message message = rabbitTemplate.receive(QUEUE_NAME);
            if(message==null){break;}

            String messageContent = new String(message.getBody(), StandardCharsets.UTF_8);
            System.out.println("Received message: " + messageContent);
            JsonNode rootNode = objectMapper.readTree(messageContent);

            Long articleId = rootNode.path("article_id").asLong();
            Boolean isBartered = rootNode.path("isBartered").asBoolean();
            String createdAt = rootNode.path("createdAt").asText();
            Optional<Barter> retrievedBarter = barterRepository.findById(articleId);
            Barter barter = retrievedBarter.orElse(null); // 또는 기본값
            messages.add(barter);
        }

        if(!(messages.isEmpty())){
            System.out.println("프로세서가 실행됨 -> 엘라스틱에 추가됨. postman에서 확인!");
            elasticsearchBulkProcessor.processToElasticsearch(messages);

            //INSERT INTO barter (barter_board_id, user_id, nickname, barter_title, barter_content, barter_card_type, bartered, barter_status)
            //VALUES (1, 1, 'exampleNickname', 'exampleTitle', 'exampleContent', 'exampleCardType', false, false);
        }
    }


}
