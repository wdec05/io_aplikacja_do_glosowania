package com.example.demo.module;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long competitionId;
    private String name;
    private String title;
    private String description;
    @Column(name = "data", columnDefinition="LONGBLOB")
    private byte[] image;
    private long votes;

    public Project(){}

    public Project(String title, String description, byte[] image, long votes, long competitionId) {
        this.competitionId = competitionId;
        this.title = title;
        this.description = description;
        this.image = image;
        this.votes = votes;
    }
}
