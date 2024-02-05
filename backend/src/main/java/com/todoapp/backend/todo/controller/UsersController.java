package com.todoapp.backend.todo.controller;

import com.todoapp.backend.todo.model.TodoModel;
import com.todoapp.backend.todo.model.UsersModel;
import com.todoapp.backend.todo.repository.TodoRepo;
import com.todoapp.backend.todo.repository.UsersRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UsersController {

    private UsersRepo usersRepo;
    private TodoRepo todoRepo;
    public UsersController(UsersRepo usersRepo,TodoRepo todoRepo) {
        this.usersRepo = usersRepo;
        this.todoRepo = todoRepo;
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

    @GetMapping(path = "/getCredentials/{username}")
    public UsersModel getUser(@PathVariable String username){
        return usersRepo.findByUsername(username);
    }

    @PutMapping(path = "/{user}/edit")
    public UsersModel changeUserCredentials(@PathVariable String user,@RequestBody UsersModel updatedData){
        UsersModel current = usersRepo.findByUsername(user);
        if (updatedData.getUsername()== null || updatedData.getUsername().trim().isEmpty()){
            updatedData.setUsername(current.getUsername());
        }
        if (updatedData.getEmail()== null || updatedData.getEmail().trim().isEmpty()){
            updatedData.setEmail(current.getEmail());
        }
        TodoModel todoUsercurrentBody = todoRepo.getTodoByUsername(user);
        todoUsercurrentBody.setUsername(updatedData.getUsername());
        todoRepo.save(todoUsercurrentBody);
        current.setUsername(updatedData.getUsername());
        current.setEmail(updatedData.getEmail());
        usersRepo.save(current);
        return current;
    }


}
