package com.phofor.phocaforme.board.service;

import com.phofor.phocaforme.board.config.ApplicationEventPublisherHolder;
import com.phofor.phocaforme.board.dto.queueDTO.PostMessage;
import com.phofor.phocaforme.board.entity.Barter;
import com.phofor.phocaforme.board.service.rabbit.producer.PostPersistEvent;
import jakarta.persistence.PostPersist;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import java.time.Instant;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Component
public class BarterEntityListener {

    @PostPersist
    public void afterSave(Barter barter) {
        ApplicationEventPublisher publisher = ApplicationEventPublisherHolder.getPublisher();
        if (publisher != null) {
            System.out.println(barter.getId());
            LocalDateTime localDateTime = barter.getRegistrationDate();
            ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
            Instant instant = zonedDateTime.toInstant();
            PostPersistEvent event = new PostPersistEvent(new PostMessage(
                    barter.getId(),
                    barter.isBartered(),
                    instant)
            );

            publisher.publishEvent(event);
        }
    }

}