package com.example.demo.controller;

import com.example.demo.module.Competition;
import com.example.demo.service.CompetitionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/competition")
@CrossOrigin(origins = "http://3.69.167.48:8080")
public class CompetitionController {
    private CompetitionService competitionService;

    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @PostMapping
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    public void saveCompetition(@RequestBody Competition competition) {
        competitionService.saveCompetition(competition);
    }

    @GetMapping
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    public java.util.List<Competition> getCompetitions() {
        return competitionService.getAllCompetitions();
    }

    @GetMapping("/{id}")
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    public Competition getCompetitionById(@PathVariable Long id) {
        return competitionService.getCompetitionById(id);
    }
}
