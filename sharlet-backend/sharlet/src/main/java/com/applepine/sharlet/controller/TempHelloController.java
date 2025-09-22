package com.applepine.microwms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TempHelloController {
    
    @GetMapping("/")
    public String getMethodName() {
        return "Hello";
    }

    @GetMapping("/hello")
    public String getHello() {
        return "Hello Login";
    }

    @GetMapping("/login")
    public String getLoginPage() {
        return "login";
    }
}
