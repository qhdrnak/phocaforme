package com.phofor.phocaforme.common.rabbit.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.phofor.phocaforme.board.dto.BarterDetailDto;
import com.phofor.phocaforme.board.service.BarterService;
import com.phofor.phocaforme.wishcard.dto.WishDocument;
import com.phofor.phocaforme.wishcard.service.WishCardService;
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
    private final String QUEUE_NAME = "barter.queue"; // TODO: application 파일로 이동
    private final RabbitTemplate rabbitTemplate;
    private final ElasticsearchBulkProcessor elasticsearchBulkProcessor;
    private final ObjectMapper objectMapper;
    private final BarterService barterService;
    private final WishCardService wishCardService;
    @Scheduled(fixedDelay = 5000) // 5초 TODO: application 파일에 schedule delay값 두고 쓰기
    public void work() throws JsonProcessingException {
        log.info("Another 5secs...");
        log.info("Worker searching for messages....");
        List<BarterDetailDto> barterMessages = new ArrayList<>();
        List<Integer> barterTypes = new ArrayList<>();
        List<WishDocument> wishMessages = new ArrayList<>();
        List<Integer> wishTypes = new ArrayList<>();
        for(int i=0; i<BATCH_SIZE; i++){
            Message message = rabbitTemplate.receive(QUEUE_NAME);
            if(message==null){break;}
            String messageContent = new String(message.getBody(), StandardCharsets.UTF_8);
            JsonNode rootNode = objectMapper.readTree(messageContent);
            int type = rootNode.path("type").asInt();
//            Boolean isBartered = rootNode.path("isBartered").asBoolean();
            if(type==0 ||type==1){ // 교환 게시글
                Long articleId = rootNode.path("articleId").asLong();
                BarterDetailDto barter = barterService.findOne(articleId);
                barterTypes.add(type);
                barterMessages.add(barter);
            }else if(type==3){ // 3번 4번 위시포카
                String userId = rootNode.path("userId").asText();
                WishDocument wish = wishCardService.findWishCardByUserId(userId);
                wishTypes.add(type);
                wishMessages.add(wish);
            }else if(type==2){
                Long articleId = rootNode.path("articleId").asLong();
                barterTypes.add(type);
                barterMessages.add(new BarterDetailDto(articleId));
            }else if(type==4){
                String userId = rootNode.path("userId").asText();
                wishTypes.add(type);
                wishMessages.add(new WishDocument(userId));
            }
            // 날짜 데이터 포맷팅

        }
        if(!(barterMessages.isEmpty()) || !(wishMessages.isEmpty())){
            elasticsearchBulkProcessor.processToElasticsearch(barterMessages, barterTypes, wishMessages, wishTypes);
        }
    }


}