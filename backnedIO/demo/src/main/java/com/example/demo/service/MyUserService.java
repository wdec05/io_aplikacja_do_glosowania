package com.example.demo.service;

import com.example.demo.module.MyUser;
import com.example.demo.repository.MyUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyUserService {
    private MyUserRepository myUserRepository;
    public MyUserService(MyUserRepository myUserRepository) {
        this.myUserRepository = myUserRepository;
    }
    @Transactional
    public void saveMyUser(MyUser myUser){
        myUserRepository.save(myUser);
    }

    public List<MyUser> getAllUsers() {
        return myUserRepository.findAll();
    }
}
