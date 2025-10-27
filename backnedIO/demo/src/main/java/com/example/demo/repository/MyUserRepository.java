package com.example.demo.repository;


import com.example.demo.module.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyUserRepository extends JpaRepository <MyUser, Long> {
    MyUser findByEmail(String email);
}
