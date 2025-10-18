package com.example.demo.module;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Entity // This annotation specifies that the class is an entity and is mapped to a database table
@Table (name = "my_user") // This annotation specifies the name of the database table to be used for mapping
@Getter
@Setter
@ToString
public class MyUser {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty("email")
    private String email;

    public MyUser() {
    }

    public MyUser(String email) {
        this.email = email;
    }
}
