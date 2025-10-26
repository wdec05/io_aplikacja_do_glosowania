package com.example.demo.mapper;

import com.example.demo.dto.ProjectDto;
import com.example.demo.module.Project;

public class ProjectMapper {
    public static Project toEntity(ProjectDto projectDto) {
        Project project = new Project();
        project.setName(projectDto.getName());
        project.setTitle(projectDto.getTitle());
        project.setDescription(projectDto.getDescription());
        project.setCompetitionId(projectDto.getCompeticionId());
        project.setVotes(projectDto.getVotes());
        project.setImage(projectDto.getImage());
        return project;
    }
}
