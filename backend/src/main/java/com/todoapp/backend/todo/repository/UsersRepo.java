package com.todoapp.backend.todo.repository;

import com.todoapp.backend.todo.model.UsersModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UsersRepo extends MongoRepository<UsersModel,String> {
    public UsersModel findByUsernameAndPassword(String username,String password);
    public UsersModel findByUsername(String username);
}
