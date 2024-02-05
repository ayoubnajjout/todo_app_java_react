package com.todoapp.backend.todo.repository;

import com.todoapp.backend.todo.model.TodoModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TodoRepo extends MongoRepository<TodoModel,String> {
    List<TodoModel> findByUsername(String username);

    TodoModel getTodoByUsername(String username);

    TodoModel findByUsernameAndId(String username,String id);

}
