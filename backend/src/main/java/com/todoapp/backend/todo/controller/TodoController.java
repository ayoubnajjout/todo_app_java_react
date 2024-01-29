package com.todoapp.backend.todo.controller;

import com.todoapp.backend.todo.model.TodoModel;
import com.todoapp.backend.todo.repository.TodoRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {

    private TodoRepo todoRepo;

    public TodoController(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    @GetMapping(path = "/basic-auth")
    public String authenticated(){
        return "Succes !";
    }

    @GetMapping(path = "/users/{username}/todo")
    public List<TodoModel> getByUsername(@PathVariable String username){
        return todoRepo.findByUsername(username);
    }

    @PostMapping(path = "/users/{username}/todo/add")
    public TodoModel getByUsername(@PathVariable String username, @RequestBody TodoModel todo){
        todo.setUsername(username);
        todoRepo.save(todo);
        return todo;
    }

    @DeleteMapping(path = "/users/{username}/todo/{id}")
    public void deleteTodoById(@PathVariable String username,@PathVariable String id){
         todoRepo.delete(todoRepo.findByUsernameAndId(username,id));
    }

    @PutMapping(path = "/users/{username}/todo/update/{id}")
    public TodoModel updateTodo(@PathVariable String username,@PathVariable String id,@RequestBody TodoModel todo){
        todoRepo.findByUsernameAndId(username,id);
        todo.setId(id);
        todo.setUsername(username);
        todo.setDone(todo.isDone());
        todoRepo.save(todo);
        return todo;
    }

    @PutMapping(path = "/users/{username}/todo/toggle/{id}")
    public TodoModel updateDone(@PathVariable String username, @PathVariable String id) {
        TodoModel currentTodo = todoRepo.findByUsernameAndId(username, id);
            currentTodo.setDone(!currentTodo.isDone());
            todoRepo.save(currentTodo);
            return currentTodo;
    }

}
