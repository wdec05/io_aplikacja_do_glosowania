package com.example.demo.service;

import com.example.demo.module.MyUser;
import com.example.demo.repository.MyUserRepository;
import org.springframework.stereotype.Service;

@Service
public class MyUserService {
    private MyUserRepository myUserRepository;
    public MyUserService(MyUserRepository myUserRepository) {
        this.myUserRepository = myUserRepository;
    }
    public void saveMyUser(MyUser myUser){
        myUserRepository.save(myUser);
    }
}
