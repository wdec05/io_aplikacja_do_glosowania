package com.example.demo.service;

import com.example.demo.module.Competition;
import com.example.demo.module.Project; // <-- Make sure this is your Project class
import com.example.demo.repository.CompetitionRepository;
import com.example.demo.repository.ProjectRepository; // <-- Make sure this is your Project repo

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    // 1. Inject the repositories you need
    private final CompetitionRepository CompetitionRepository;
    private final ProjectRepository projectRepository;

    public DataInitializer(CompetitionRepository CompetitionRepository,
                           ProjectRepository projectRepository) {
        this.CompetitionRepository = CompetitionRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Starting data initialization...");

        // 2. Create and Save the main Competition
        Competition Competition = new Competition(
                "Budżet Obywatelski 2025 - Pula Ogólnomiejska",
                new ArrayList<>() // Start with an empty list of voters
        );

        // Save it and get the managed object (which has the generated ID)
        Competition savedCompetition = CompetitionRepository.save(Competition);

        System.out.println("Created Competition with ID: " + savedCompetition.getId());

        // 3. Create Projects linked to the saved Competition
        // I'm assuming your Project class has a constructor like:
        // public Project(String name, String description, Competition Competition)

        Project proj1 = new Project(Competition.getId(),"plac zabaw1", "Projekt placu zabaw dla dzieci.","des3",0);
        Project proj2 = new Project(Competition.getId(),"plac zabaw2", "Projekt placu zabaw dla dzieci.","des2",0);
        Project proj3 = new Project(Competition.getId(),"plac zabaw3", "Projekt placu zabaw dla dzieci.","des1",0);

        // 4. Save all the new projects
        projectRepository.saveAll(List.of(proj1, proj2, proj3));

        System.out.println("Created 3 new projects linked to the Competition.");
        System.out.println("Data initialization complete.");
    }
}
