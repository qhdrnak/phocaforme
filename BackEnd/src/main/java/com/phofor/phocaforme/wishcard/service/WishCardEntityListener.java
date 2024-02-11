package com.phofor.phocaforme.wishcard.service;

import com.phofor.phocaforme.board.config.ApplicationEventPublisherHolder;
import com.phofor.phocaforme.common.rabbit.producer.events.WishCardDeleteEvent;
import com.phofor.phocaforme.common.rabbit.producer.events.WishCardPersistEvent;
import com.phofor.phocaforme.wishcard.dto.WishMessage;
import com.phofor.phocaforme.wishcard.entity.WishCard;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import org.springframework.context.ApplicationEventPublisher;

import static com.phofor.phocaforme.board.config.ElasticsearchClientConfig.toInstantFormat;

public class WishCardEntityListener {

    @PostPersist
    public void afterUpdate(WishCard wishCard){
        ApplicationEventPublisher publisher = ApplicationEventPublisherHolder.getPublisher();
        if(publisher != null){
            WishCardPersistEvent event = new WishCardPersistEvent(new WishMessage(
                    wishCard.getUserEntity().getUserId(),
                    toInstantFormat(wishCard.getCreatedAt()),
                    3
            ));
            publisher.publishEvent(event);
        }
    }

    @PostRemove
    public void afterDelete(WishCard wishCard){
        ApplicationEventPublisher publisher = ApplicationEventPublisherHolder.getPublisher();
        if(publisher != null){
            WishCardDeleteEvent event = new WishCardDeleteEvent(new WishMessage(
                    wishCard.getUserEntity().getUserId(),
                    toInstantFormat(wishCard.getCreatedAt()),
                    4
            ));
            publisher.publishEvent(event);
        }
    }

}
