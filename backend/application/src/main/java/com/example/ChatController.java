package com.example;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://127.0.0.1:5500") // Permite solicitudes desde tu frontend
public class ChatController {

    private final List<ChatMessage> messages = new ArrayList<>();
    private final AtomicInteger lastId = new AtomicInteger(0);

    @GetMapping
    public ChatResponse getMessages(@RequestParam(defaultValue = "0") int since) {
        List<String> newMessages = new ArrayList<>();
        int latestId = since;

        synchronized (messages) {
            for (ChatMessage msg : messages) {
                if (msg.getId() > since) {
                    newMessages.add(msg.getText());
                    latestId = msg.getId();
                }
            }
        }

        return new ChatResponse(newMessages, latestId);
    }

    @PostMapping
    public void postMessage(@RequestParam String message) {
        synchronized (messages) {
            messages.add(new ChatMessage(lastId.incrementAndGet(), message));
            if (messages.size() > 50) {
                messages.remove(0);
            }
        }
    }
}
