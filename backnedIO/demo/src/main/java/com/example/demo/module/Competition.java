package com.example.demo.module;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Competition {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @ElementCollection
    private List<Long> emailsthat_voted;

   public Competition(){}

    public Competition(String name, List<Long> emailsthat_voted) {
        this.name = name;
        this.emailsthat_voted = emailsthat_voted;
    }
    public Competition(String name){
        this.name = name;
    }

    //return all Competitions that exists in database
    // return all projects by competition ID
    // create competition endpint
    // crate Project
    //
}
