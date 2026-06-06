package com.vidyasampadana.iamservice.service;


import com.vidyasampadana.iamservice.model.User;
import com.vidyasampadana.iamservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // 1. Business Logic for Sign Up
    public String registerUser(User newUser) {
        if (userRepository.existsById(newUser.getUsername())) {
            return "USERNAME_TAKEN";
        }

        // This is exactly where you will add password hashing (BCrypt) later!
        userRepository.save(newUser);
        return "SUCCESS";
    }

    // 2. Business Logic for Login
    public String authenticateUser(String username, String password) {
        Optional<User> userOptional = userRepository.findById(username);

        if (userOptional.isEmpty()) {
            return "USER_NOT_FOUND";
        }

        User existingUser = userOptional.get();

        // This is exactly where you will eventually generate a JWT token!
        if (existingUser.getPassword().equals(password)) {
            return "SUCCESS";
        } else {
            return "INVALID_CREDENTIALS";
        }
    }
}