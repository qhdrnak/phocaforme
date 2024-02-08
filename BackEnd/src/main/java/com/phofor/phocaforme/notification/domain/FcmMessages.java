package com.phofor.phocaforme.notification.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
public class FcmMessages {
    private boolean validateOnly;
    private Message message;

    @Builder
    @AllArgsConstructor
    @Getter
    public static class Message {
        private List<String> tokens;
        private Map<String, String> data;
    }
}