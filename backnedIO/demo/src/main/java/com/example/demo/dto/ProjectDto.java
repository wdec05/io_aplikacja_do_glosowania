package com.example.demo.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDto {
    private Long competicionId;
    private String name;
    private String title;
    private String description;
    @Column(name = "data", columnDefinition="LONGBLOB")
    private byte[] image;
    private long votes;
}
