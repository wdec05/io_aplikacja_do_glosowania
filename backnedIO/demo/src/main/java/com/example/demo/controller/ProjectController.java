package com.example.demo.controller;


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
    public void saveProject(@RequestBody Project project){
        projectService.saveProject(project);
    }

    @GetMapping
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    public List<Project> getProjects() {
        return projectService.getAllProjects();
    }

}
