package com.example.demo.service;

import com.example.demo.module.Competition;
import com.example.demo.module.MyUser;
import com.example.demo.module.Project;
import com.example.demo.repository.CompetitionRepository;
import com.example.demo.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {
    private CompetitionRepository competitionRepository;
    private MyUserService myUserService;
    private ProjectRepository projectRepository;
    public CompetitionService(CompetitionRepository competitionRepository, MyUserService myUserService, ProjectRepository projectRepository) {
        this.competitionRepository = competitionRepository;
        this.myUserService = myUserService;
        this.projectRepository = projectRepository;
    }

    @Transactional
    public Competition saveCompetition(Competition competition) {return competitionRepository.save(competition);}
    public List<Competition> getAllCompetitions() {return competitionRepository.findAll();}

    public void voteByEmail(String email, Long projectId){
        MyUser myUser =myUserService.findByEmail(email);
        Project project = projectRepository.findById(projectId).get();
        Competition competition = competitionRepository.findById(project.getCompetitionId()).orElse(null);
        if(competition.getEmailsthat_voted().contains(myUser.getId())){
            throw new RuntimeException("email already voted");
        }
        if(competition != null){
            project.setVotes(project.getVotes() + 1);
            competition.getEmailsthat_voted().add(myUser.getId());
        }
        projectRepository.save(project);
        competitionRepository.save(competition);
    }
    public Competition getCompetitionById(Long id) {
        return competitionRepository.findById(id).orElse(null);
    }

    public Long getCompetitionIdByProjectId(Long projectId){
        return projectRepository.findById(projectId).get().getCompetitionId();
    }
}
