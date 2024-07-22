package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void createUser(User user);
    List<User> findAllUsers();
    void removeUser(Long id);
    void updateUser(User user);
    User getUserById(Long id);
    Optional<User> getByUsername(String username);

    UserDetails loadUserByEmail(String email) throws UsernameNotFoundException;

    User getCurrentUser();
}
