package com.example.demo.service;

import com.example.demo.module.Competition;
import com.example.demo.repository.CompetitionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {
    private CompetitionRepository competitionRepository;
    public CompetitionService(CompetitionRepository competitionRepository) {this.competitionRepository = competitionRepository;}

    @Transactional
    public void saveCompetition(Competition competition) {competitionRepository.save(competition);}
    public List<Competition> getAllCompetitions() {return competitionRepository.findAll();}


}
