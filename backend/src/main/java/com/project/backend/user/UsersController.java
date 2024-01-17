package com.project.backend.user;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsersController {

    private UserService service;

    public UsersController(UserService service){
        this.service=service;
    }

    @GetMapping(path = "/users")
    public List<User> getAllUsers(){
        return service.findAll();
    }

    @GetMapping(path = "/users/{id}")
    public User findById(@PathVariable int id){
        return service.findById(id);
    }

    @PostMapping(path = "/users")
    public void createUser(@RequestBody User user) {
        service.addUser(user);
    }

    @DeleteMapping(path = "/users/{id}")
    public void deleteById(@PathVariable int id){
        service.deleteById(id);
    }

}
