package com.maxim.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ServerApplication {

    // Logger logger = LoggerFactory.getLogger(ServerApplication.class);
    // logger.info("james");

    @GetMapping("/james")
    public String welcome() {
        return "Welcome to Google !!";
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
}
