package com.project.backend.todo;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class TodoController {

    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping(path = "/basic-auth")
    public String basicAuth(){
     return "succes !";
    }

    @GetMapping(path = "/users/{username}/todo")
    public List<Todo> getAllTodo(@PathVariable String username){
        return todoService.findByUsername(username);
    }

    @DeleteMapping(path = "/users/{username}/todo/{id}")
    public void getAllTodo(@PathVariable String username,@PathVariable int id){
         todoService.deleteById(id);
    }

    @PostMapping(path = "/users/{username}/todo/add")
    public Todo addNewTodo(@PathVariable String username,@RequestBody Todo todo){
            return todoService.addTodo(todo);
    }

    @PutMapping(path = "/users/{username}/todo/update/{id}")
    public void updateTodo(@PathVariable String username,@PathVariable int id,@RequestBody Todo todo){
        todoService.updateTodo(todo);
    }

    @PutMapping(path = "/users/{username}/todo/toggle/{id}")
    public void toggleState(@PathVariable String username,@PathVariable int id){
        todoService.toggleTodo(id);
    }

}
