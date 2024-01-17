package com.project.backend.user;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Service
public class UserService {

    //creating a service class with a static data

    private static List<User> users = new ArrayList<>();
    private static int usersCount = 0;

    static {
        users.add(new User(++usersCount,"Adam", LocalDate.now().minusYears(30)));
        users.add(new User(++usersCount,"Jhon", LocalDate.now().minusYears(21)));
        users.add(new User(++usersCount,"Mark", LocalDate.now().minusYears(10)));
    }

    public List<User> findAll(){
        return users;
    }

    public User addUser(User user){
        user.setId(++usersCount);
        users.add(user);
        return user;
    }

    public User findById(int id) {
        Predicate<? super User> predicate = user -> Integer.valueOf(user.getId()).equals(id);
        return users.stream().filter(predicate).findFirst().orElse(null);
    }

    public void deleteById(int id){
        Predicate<? super User> predicate = user -> Integer.valueOf(user.getId()).equals(id);
        users.removeIf(predicate);
    }

}
