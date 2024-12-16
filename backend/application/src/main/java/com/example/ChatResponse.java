package com.example;

import java.util.List;

public record ChatResponse(List<String> messages, int timestamp) {

}
