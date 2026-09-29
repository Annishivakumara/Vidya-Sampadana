package com.vidyasampadana.iamservice.controller;


import com.vidyasampadana.iamservice.dto.AuthResponse;
import com.vidyasampadana.iamservice.model.User;
import com.vidyasampadana.iamservice.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final String internalServiceToken;

    public AuthController(AuthService authService,
                          @Value("${security.internal-service-token:}") String internalServiceToken) {
        this.authService = authService;
        this.internalServiceToken = internalServiceToken;
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

    @DeleteMapping("/internal/users/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username,
                                           @RequestHeader(value = "X-Internal-Service-Token", required = false) String token) {
        if (internalServiceToken.isBlank() || token == null || !MessageDigest.isEqual(
                internalServiceToken.getBytes(StandardCharsets.UTF_8), token.getBytes(StandardCharsets.UTF_8))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Internal service authentication failed.");
        }
        authService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }
}
