package com.example.demo.mapper;

import com.example.demo.dto.ProjectDto;
import com.example.demo.module.Project;

public class ProjectMapper {
    public static Project toEntity(ProjectDto projectDto) {
        Project project = new Project();
        project.setTitle(projectDto.getTitle());
        project.setDescription(projectDto.getDescription());
        project.setCompetitionId(projectDto.getCompetitionId());
        project.setVotes(projectDto.getVotes());
        project.setImage(projectDto.getImage());
        return project;
    }
}
