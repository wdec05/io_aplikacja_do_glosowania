package com.example.demo.service;

import com.example.demo.module.Competition;
import com.example.demo.module.Project; // <-- Make sure this is your Project class
import com.example.demo.repository.CompetitionRepository;
import com.example.demo.repository.ProjectRepository; // <-- Make sure this is your Project repo

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    // 1. Inject the repositories you need
    private final CompetitionRepository competitionRepository;
    private final ProjectRepository projectRepository;

    public DataInitializer(CompetitionRepository competitionRepository,
                           ProjectRepository projectRepository) {
        this.competitionRepository = competitionRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Starting data initialization...");

        // 2. Create and Save the main Competition
        Competition competition = new Competition(
                "Budżet Obywatelski 2025 - Pula Ogólnomiejska",
                new ArrayList<>() // Start with an empty list of voters
        );

        // Save it and get the managed object (which has the generated ID)
        Competition savedCompetition = competitionRepository.save(competition);

        System.out.println("Created Competition with ID: " + savedCompetition.getId());
        String kalenistenikParkPath="static/plac dla kalesniteników.jpg";
        String fontannaPath="static/fontanna.jpg";
        String childernpart="static/plac zabaw.jpg";

        byte[] kalenistenikBytes = loadBytesFromClasspath(kalenistenikParkPath);
        byte[] fontannaBytes = loadBytesFromClasspath(fontannaPath);
        byte[] childernpartBytes = loadBytesFromClasspath(childernpart);

        Project proj1 = new Project("Projekt placu zabaw dla dzieci.", "plac zabaw1",kalenistenikBytes,0,competition.getId());
        Project proj2 = new Project("fontanna na wydziale WIEIT.", "bardzo ciekawe lorem ipsum na temat fontanny",fontannaBytes,0,competition.getId());
        Project proj3 = new Project("plac zabaw ba bronowicahc", "plac zabaw to przyszłocćpolaków , dzięki któremu nasze dziecię będąw 100% skuteczne na rynku pracy",childernpartBytes,0,competition.getId());

        projectRepository.saveAll(List.of(proj1, proj2, proj3));

        System.out.println("Created 3 new projects linked to the competition.");
        System.out.println("Data initialization complete.");
    }
    public static byte[] loadBytesFromClasspath(String path) throws IOException {
        // ClassPathResource is a Spring utility that makes this easy
        ClassPathResource resource = new ClassPathResource(path);

        if (!resource.exists()) {
            throw new IOException("File not found at classpath path: " + path);
        }

        // Open an InputStream to the resource
        try (InputStream inputStream = resource.getInputStream()) {
            // Spring's FileCopyUtils can easily copy the stream to a byte array
            return FileCopyUtils.copyToByteArray(inputStream);

            // Or using pure Java (since Java 9+):
            // return inputStream.readAllBytes();
        }
    }


}