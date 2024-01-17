package com.project.backend.todo;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Service
public class TodoService {
    private static List<Todo> todos = new ArrayList<>();
    private static int todosCount = 0;

    static {
        todos.add(new Todo(++todosCount, "ayubhh","Learn OOP",
                LocalDate.now().plusYears(10), false ));
        todos.add(new Todo(++todosCount, "ayubhh","Learn DevOps",
                LocalDate.now().plusYears(11), false ));
        todos.add(new Todo(++todosCount, "ayubhh","Learn Full Stack Java Development",
                LocalDate.now().plusYears(12), false ));
        todos.add(new Todo(++todosCount, "ayubhh","learn C#",
                LocalDate.now().plusYears(12), false ));
    }
    public List<Todo> findByUsername(String username){
        Predicate<? super Todo> predicate =
                todo -> todo.getUsername().equalsIgnoreCase(username);
        return todos.stream().filter(predicate).toList();
    }
    public Todo addTodo(Todo todo) {
        todo.setId(++todosCount);
        todos.add(todo);
        return todo;
    }
    public void deleteById(int id) {
        Predicate<? super Todo> predicate = todo -> todo.getId() == id;
        todos.removeIf(predicate);
    }
    public void updateTodo(Todo todo) {
        deleteById(todo.getId());
        todos.add(todo);
    }
    public void toggleTodo(int id) {
        // Find the Todo with the given ID
        Todo todoToUpdate = todos.stream()
                .filter(todo -> todo.getId() == id)
                .findFirst()
                .orElse(null);
        if (todoToUpdate != null) {
            todoToUpdate.setDone(!todoToUpdate.isDone());
        }
    }




}