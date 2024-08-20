package com.sun.in.MyControllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WelcomeController {
    @GetMapping({"/", "/welcome"})
    public String index() {
        return "welcome";
    }

    @GetMapping("/customerHome")
    public String CustomerHome() {
        return "/customerHome";
    }
//
//    @GetMapping("/register")
//    public String register() {
//        return "Authentication/register";
//    }
}
