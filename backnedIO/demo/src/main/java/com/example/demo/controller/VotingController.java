package com.example.demo.controller;

import com.example.demo.dto.VoteRequest;
import com.example.demo.service.BrevoMailService;
import com.example.demo.service.CompetitionService;
import com.example.demo.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/mail")

public class VotingController {
    @Value("${frontend.domain}")
    private String frontendDomain;

    private BrevoMailService brevoMailService;
    private CompetitionService competitionService;

    @Autowired
    public VotingController(BrevoMailService brevoMailService,CompetitionService competitionService) {
        this.brevoMailService = brevoMailService;
        this.competitionService = competitionService;
    }

    @PostMapping("/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void sendEmail(@PathVariable String email,@RequestParam Long projectId){
        brevoMailService.sendMail(email,projectId);
    }

    @GetMapping("/vote")
    public RedirectView vote(@RequestParam Long projectId, @RequestParam String email ){
        competitionService.voteByEmail(email,projectId);
        Long competitionId = competitionService.getCompetitionIdByProjectId(projectId);
        return new RedirectView(frontendDomain+competitionId);
    }
}
