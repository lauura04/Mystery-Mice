package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final List<ChatMessage> messages = new ArrayList<>();
    private final AtomicInteger lastId = new AtomicInteger(0);
    private final AtomicInteger numClient = new AtomicInteger(0);

    //ruta para GET
    @GetMapping()
    public ChatResponse getMessages(@RequestParam(defaultValue="0") int since){
        List<String> newMessages = new ArrayList<>();
        int latestId = since;

        synchronized(messages){
            for(ChatMessage msg : messages){
                if(msg.getId() > since){
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
    

    //ruta para POST
    @PostMapping()
    public void postMessage(@RequestParam String message){
        synchronized(messages){
            messages.add(new ChatMessage(lastId.incrementAndGet(), message));
            if(messages.size() > 50){
                messages.remove(0); //almacena los ultimos 50 mensajes
            }
        }
    }

    @PostMapping("/connect")
    public int connectClient() {
        int currentClients = numClient.incrementAndGet();
        System.out.println("Client connected. Active clients: " + currentClients);
        return currentClients;
    }

    @PostMapping("/disconnect")
    public int disconnectClient() {
        int currentClients = numClient.decrementAndGet();
        System.out.println("Client disconnected. Active clients: " + currentClients);
        return currentClients;
    }
    

    //ruta para PUT
    @PutMapping("/hello/{id}")
    public String putHello(@PathVariable int id, @RequestBody String name){
        return "Actualizado el ID " + id + " con el nombre " + name;
    }

    //ruta para DELETE
    @DeleteMapping("/hello/{id}")
    public String deleteHello(@PathVariable int id){
        return "Eliminado el recurso con ID " + id;
    }

    public static class ChatResponse{
        private final List<String> messages;
        private final int timestamp;

        public ChatResponse(List<String> messages, int timestamp){
            this.messages = messages;
            this.timestamp = timestamp;
        }

        public List<String> getMessages(){
            return messages;
        }

        public int getTimestamp(){
            return timestamp;
        }
    }
}
