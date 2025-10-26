package com.example.demo.controller;


import com.example.demo.dto.ProjectDto;
import com.example.demo.module.Competition;
import com.example.demo.module.Project;
import com.example.demo.service.ProjectService;
import jdk.jfr.Frequency;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://3.69.167.48:8080")
public class ProjectController {
    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {this.projectService = projectService;}

    @PostMapping
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    public void saveProject(@RequestBody ProjectDto projectDto){
        projectService.saveProject(projectDto);
    }

    @GetMapping
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    public List<Project> getProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    public Project getProjectById(@PathVariable Long id) {
        return projectService.getProjectsById(id);
    }

    @GetMapping("/competition/{competitionId}")
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    public List<Project> getProjectsByCompetitionId(@PathVariable Long competitionId) {
        return projectService.getProjectsByCompetitionId(competitionId);
    }

}
