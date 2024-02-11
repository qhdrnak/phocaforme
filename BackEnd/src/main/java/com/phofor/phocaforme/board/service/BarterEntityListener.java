package com.phofor.phocaforme.board.service;

import com.phofor.phocaforme.board.config.ApplicationEventPublisherHolder;
import com.phofor.phocaforme.board.dto.queueDTO.BarterMessage;
import com.phofor.phocaforme.board.dto.queueDTO.WishMessage;
import com.phofor.phocaforme.board.entity.Barter;
import com.phofor.phocaforme.board.service.rabbit.producer.PostDeleteEvent;
import com.phofor.phocaforme.board.service.rabbit.producer.PostPersistEvent;
import com.phofor.phocaforme.board.service.rabbit.producer.PostUpdateEvent;
import com.phofor.phocaforme.wishcard.entity.WishCard;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.PreUpdate;
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
            PostPersistEvent event = new PostPersistEvent(new BarterMessage(
                    barter.getId(),
                    barter.isBartered(),
                    0,
                    instant)
            );

            publisher.publishEvent(event);
        }
    }


//    @PreUpdate
//    public void beforeUpdate(Barter barter){
//
//    }

//    @PostRemove
//    public void afterDelete(Barter barter) {
//        ApplicationEventPublisher publisher = ApplicationEventPublisherHolder.getPublisher();
//        if (publisher != null) {
//            LocalDateTime localDateTime = barter.getRegistrationDate();
//            ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
//            Instant instant = zonedDateTime.toInstant();
//            PostDeleteEvent event = new PostDeleteEvent(new BarterMessage(
//                    barter.getId(),
//                    barter.isBartered(),
//                    2,
//                    instant)
//            );
//            publisher.publishEvent(event);
//        }
//    }
    @PostUpdate
    public void afterUpdate(Barter barter){
        ApplicationEventPublisher publisher = ApplicationEventPublisherHolder.getPublisher();
        if (publisher != null) {
            LocalDateTime localDateTime = barter.getRegistrationDate();
            ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
            Instant instant = zonedDateTime.toInstant();
            PostUpdateEvent event = new PostUpdateEvent(new BarterMessage(
                    barter.getId(),
                    barter.isBartered(),
                    1,
                    instant)
            );
            publisher.publishEvent(event);
        }
    }

    //    @PostUpdate
//    public void afterUpdate(WishCard wishCard){
//        ApplicationEventPublisher publisher = ApplicationEventPublisherHolder.getPublisher();
//        if(publisher != null){
//            PostUpdateEvent event = new PostUpdateEvent(new WishMessage(
//                    wishCard.getWishCardId(),
//                    wishCard.getCreatedAt()
//            ));
//        }
//    }
}