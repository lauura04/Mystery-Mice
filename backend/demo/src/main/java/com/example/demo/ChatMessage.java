package com.example.demo;

public record ChatMessage(int id, String text) {

    public int getId(){
        return id;
    }

    public String getText(){
        return text;
    }

}