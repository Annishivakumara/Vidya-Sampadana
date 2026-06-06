package com.vidyasampadana.iamservice.controller;


import com.vidyasampadana.iamservice.model.User;
import com.vidyasampadana.iamservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService; // Injecting the business logic layer

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User newUser) {
        String result = authService.registerUser(newUser);

        if ("USERNAME_TAKEN".equals(result)) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        return ResponseEntity.ok("User registered successfully via Service Layer!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        String result = authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());

        switch (result) {
            case "SUCCESS":
                return ResponseEntity.ok("Login successful! Welcome back.");
            case "USER_NOT_FOUND":
                return ResponseEntity.status(404).body("Error: User does not exist!");
            case "INVALID_CREDENTIALS":
                return ResponseEntity.status(401).body("Error: Wrong password!");
            default:
                return ResponseEntity.internalServerError().body("An unexpected error occurred.");
        }
    }
}