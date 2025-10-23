package com.example.demo.controller;


import jdk.jfr.Frequency;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://3.69.167.48:8080")
public class ProjectController {
    private ProjectService projectService;


}
