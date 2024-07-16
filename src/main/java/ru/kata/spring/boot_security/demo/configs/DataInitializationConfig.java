package ru.kata.spring.boot_security.demo.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataInitializationConfig {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializationConfig(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public void initializeData() {
        Role role1 = new Role();
        role1.setName("ROLE_USER");
        Role role2 = new Role();
        role2.setName("ROLE_ADMIN");

        roleRepository.save(role1);
        roleRepository.save(role2);

        List<Role> adminRoles = new ArrayList<>();
        adminRoles.add(role1);
        adminRoles.add(role2);

        List<Role> userRoles = new ArrayList<>();
        userRoles.add(role1);

        User admin = new User();
        admin.setPassword(passwordEncoder.encode("12345"));
        admin.setRoles(adminRoles);
        admin.setUsername("admin12");
        admin.setAge(45);
        admin.setEmail("admin@mail.ru");
        userRepository.save(admin);

        User user = new User();
        user.setPassword(passwordEncoder.encode("54321"));
        user.setRoles(userRoles);
        user.setUsername("user");
        user.setAge(25);
        user.setEmail("user@mail.ru");
        userRepository.save(user);
    }
}

