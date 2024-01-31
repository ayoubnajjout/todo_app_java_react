package com.todoapp.backend.todo.controller;

import com.todoapp.backend.todo.model.UsersModel;
import com.todoapp.backend.todo.repository.UsersRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UsersController {

    private UsersRepo usersRepo;
    public UsersController(UsersRepo usersRepo) {
        this.usersRepo = usersRepo;
    }

    @PostMapping(path = "/register")
    public UsersModel addNewUser(@RequestBody UsersModel user){
        usersRepo.save(user);
        return user;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<UsersModel> loginUser(@RequestBody UsersModel user) {
        UsersModel loginResult = usersRepo.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (loginResult != null) {
            return ResponseEntity.ok(loginResult);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
