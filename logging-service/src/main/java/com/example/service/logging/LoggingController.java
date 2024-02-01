package com.example.service.logging;

import ch.qos.logback.core.joran.sanity.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping(path = "/logging")
public class LoggingController {

    private final LoggingService loggingService;

    @Autowired
    public LoggingController(LoggingService loggingService) {
        this.loggingService = loggingService;
    }

    @PostMapping
    public String addMessage(@RequestBody Message message) {

        System.out.println(message);

        String result = loggingService.addMessage(message);
        if (result == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "UUID is used or bad json");
        }
        return result;
    }

    @GetMapping
    public List<String> getMessages() {
        return loggingService.getMessages();
    }

}
