package com.example.demo.controller;

import com.example.demo.module.MyUser;
import com.example.demo.repository.MyUserRepository;
import com.example.demo.service.MyUserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Ta adnotacja sprawia, że ta klasa będzie wysyłać zapytania API
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://3.69.167.48:8080")// Każdy endpoint w tej klasie będzie miał prefiks /api/user
public class MyUserController {
    private MyUserService myUserService;
//    Spring sam zarządza tworzeniem obiektów i wstrzykiwaniem zależności, więc nie musisz ręcznie tworzyć instancji MyUserRepository.
//    Wystarczy, że zadeklarujesz konstruktor lub adnotację @Autowired, a Spring zajmie się resztą.
    public MyUserController(MyUserService myUserService) {
        this.myUserService = myUserService;
    }


    @PostMapping // Ta adnotacja sprawia, że metoda będzie odpowiadać na zapytania GET pod adresem /api/user
    @ResponseStatus(org.springframework.http.HttpStatus.OK) // Ta adnotacja ustawia status odpowiedzi HTTP na 200 OK
    public void saveUser(@RequestBody MyUser myUser){ // Ta adnotacja sprawia, że metoda będzie oczekiwać obiektu MyUser w ciele zapytania{
        myUserService.saveMyUser(myUser);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<MyUser> getUser(){
        return myUserService.getAllUsers();
    }

}
