package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // Permitir solicitudes desde cualquier origen
public class ChatController {

    private final List<ChatMessage> messages = new ArrayList<>();
    private final AtomicInteger lastId = new AtomicInteger(0);
    private final AtomicInteger numClient = new AtomicInteger(0);

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

    @GetMapping("/activeClients")
    public int getActiveClients() {
        return numClient.get();
    }

    @PostMapping
    public void postMessage(@RequestParam String message) {
        synchronized (messages) {
            messages.add(new ChatMessage(lastId.incrementAndGet(), message));
            if (messages.size() > 50) {
                messages.remove(0); // Almacenar los últimos 50 mensajes
            }
        }
    }

    @PostMapping("/connect")
    public int connectClient() {
        return numClient.incrementAndGet();
    }

    @PostMapping("/disconnect")
    public int disconnectClient() {
        return numClient.getAndDecrement();
    }

    public static class ChatResponse {
        private final List<String> messages;
        private final int timestamp;

        public ChatResponse(List<String> messages, int timestamp) {
            this.messages = messages;
            this.timestamp = timestamp;
        }

        public List<String> getMessages() {
            return messages;
        }

        public int getTimestamp() {
            return timestamp;
        }
    }
}
