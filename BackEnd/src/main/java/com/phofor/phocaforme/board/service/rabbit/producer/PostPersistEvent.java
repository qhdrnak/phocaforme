package com.phofor.phocaforme.board.service.rabbit.producer;

import org.springframework.context.ApplicationEvent;

public class PostPersistEvent extends ApplicationEvent {
    public PostPersistEvent(Object source){
        super(source);
    }
}
