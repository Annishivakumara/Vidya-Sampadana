package com.vidyasampadana.iamservice.controller;


import com.vidyasampadana.iamservice.dto.AuthResponse;
import com.vidyasampadana.iamservice.model.User;
import com.vidyasampadana.iamservice.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody User newUser) {
        return ResponseEntity.ok(authService.registerUser(newUser));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody User loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword()));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent().build();
    }
}
