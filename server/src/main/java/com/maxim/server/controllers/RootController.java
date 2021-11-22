package com.maxim.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String greeting() {
        return "Hello team";
    }

    @GetMapping("/restricted")
    public String restricted() {
        return "logged in";
    }
}
