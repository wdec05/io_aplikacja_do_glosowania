package com.example.demo.controller;

import com.example.demo.service.BrevoMailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mail")

public class BrevoMailController {
    private BrevoMailService brevoMailService;

    @Autowired
    public BrevoMailController(BrevoMailService brevoMailService) {
        this.brevoMailService = brevoMailService;
    }

    @PostMapping("/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void sendMail(@PathVariable String email){
        brevoMailService.sendMail(email);
    }
}
