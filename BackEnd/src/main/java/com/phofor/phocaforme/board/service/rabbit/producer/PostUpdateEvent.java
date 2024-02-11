package com.phofor.phocaforme.board.service.rabbit.producer;

import org.springframework.context.ApplicationEvent;

public class PostUpdateEvent  extends ApplicationEvent {

    public PostUpdateEvent(Object source) {
        super(source);
    }
}
