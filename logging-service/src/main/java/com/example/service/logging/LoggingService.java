package com.example.service.logging;

import ch.qos.logback.core.joran.sanity.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoggingService {
    private final Map<UUID, String> messages = new ConcurrentHashMap<>();

    public String addMessage(Message message) {
        if (message.uuid() == null || message.message() == null) {
            return null;
        }
        if (messages.containsKey(message.uuid())) {
            return null;
        }
        messages.put(message.uuid(), message.message());
        return "OK";
    }
    public List<String> getMessages() {
        return messages.values().stream().toList();
    }
}
