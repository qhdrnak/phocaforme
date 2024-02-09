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
        log.info("10초마다 스케쥴드");
        System.out.println("work()도착");
        List<BarterDetailDto> messages = new ArrayList<>();

        for(int i=0; i<BATCH_SIZE; i++){
            Message message = rabbitTemplate.receive(QUEUE_NAME);
            if(message==null){break;}
            System.out.println("<<><><><><><><><>><>><><>><><><");
            String messageContent = new String(message.getBody(), StandardCharsets.UTF_8);
            System.out.println("Received message: " + messageContent);
            JsonNode rootNode = objectMapper.readTree(messageContent);
            Long articleId = rootNode.path("articleId").asLong();
            Boolean isBartered = rootNode.path("isBartered").asBoolean();
            System.out.println(">>1");
//            System.out.println(">>2"+retrievedBarter.orElse(null).getNickname());
            // 이 시점에 articleId, isBartered 만 있음.
            //
            BarterDetailDto barter = barterService.findOne(articleId);
            System.out.println(">>>>"+barter);
            // 날짜 데이터 포맷팅


            // 다른 DTO로 이전
//            BarterDocument barter = BarterDocument.builder()
//                    .articleId(barterEntity.getId())
//                    .title(barterEntity.getTitle())
//                    .isBartered(barterEntity.isBartered())
//                    .content(barterEntity.getContent())
//                    .cardType(barterEntity.getCardType())
//                    .writerId(barterEntity.getUser().getUserId()) // lazyInitializationException
//                    .writerNickname(barterEntity.getUser().getNickname()) // lazyInitializationException
//                    .ownMember(barterEntity.getOwnMember()) // lazyInitializationException
//                    .targetMember(barterEntity.getTargetMember()) // lazyInitializationException
//                    .imageUrl(barterEntity.getImages().get(0).getImgCode())
//                    .createdAt(instant)
//                    .build();
            messages.add(barter);
            System.out.println(">>4");
        }
        for (BarterDetailDto barter: messages){
            System.out.println(barter);
            System.out.println(">>5");
        }
        if(!(messages.isEmpty())){
            System.out.println("프로세서가 실행됨 -> 엘라스틱에 추가해줘!!");
            elasticsearchBulkProcessor.processToElasticsearch(messages);

            //INSERT INTO barter (barter_board_id, user_id, nickname, barter_title, barter_content, barter_card_type, bartered, barter_status)
            //VALUES (1, 1, 'exampleNickname', 'exampleTitle', 'exampleContent', 'exampleCardType', false, false);
        }
    }


}
