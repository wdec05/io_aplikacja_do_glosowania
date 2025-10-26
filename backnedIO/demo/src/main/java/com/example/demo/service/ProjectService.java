package com.example.demo.service;

import com.example.demo.dto.ProjectDto;
import com.example.demo.mapper.ProjectMapper;
import com.example.demo.module.Project;
import com.example.demo.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private ProjectRepository projectRepository;
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public void saveProject(ProjectDto project) {
        projectRepository.save(ProjectMapper.toEntity(project)) ;
    }

    public List<Project> getAllProjects() { return projectRepository.findAll(); }
}
