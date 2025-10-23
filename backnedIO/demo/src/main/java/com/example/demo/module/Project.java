package com.example.demo.module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class    Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long competicionId;
    private String name;
    private String title;
    private String description;
    private long votes;

    public Project(){}

    public Project(Long competicionId, String name, String title, String description, long votes) {
        this.competicionId = competicionId;
        this.name = name;
        this.title = title;
        this.description = description;
        this.votes = votes;
    }
}
