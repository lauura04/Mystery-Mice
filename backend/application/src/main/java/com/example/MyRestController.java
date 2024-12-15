package com.example;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/hello")
public class MyRestController {

    @GetMapping()
    public Advertisement getMethodName() {
        return new Advertisement("My used coach", 0, 1_000);
    }
}
