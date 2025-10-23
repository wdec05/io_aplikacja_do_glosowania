package com.example.demo.module;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Competicion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @ElementCollection
    private List<Long> emailsthat_voted;

    Competicion(){}

    public Competicion(String name, List<Long> emailsthat_voted) {
        this.name = name;
        this.emailsthat_voted = emailsthat_voted;
    }
    public Competicion(String name){
        this.name = name;
    }

    //return all competicions that exists in database
    // return all projects by competition ID
    // create competition endpint
    // crate Project
    //
}
