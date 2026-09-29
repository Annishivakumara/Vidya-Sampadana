package com.vidyasampadana.iamservice.service;


import com.vidyasampadana.iamservice.dto.AuthResponse;
import com.vidyasampadana.iamservice.model.User;
import com.vidyasampadana.iamservice.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public AuthResponse registerUser(User newUser) {
        if (newUser.getUsername() == null || newUser.getUsername().isBlank()
                || newUser.getEmail() == null || newUser.getEmail().isBlank()
                || newUser.getPassword() == null || newUser.getPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Username, email, and a password of at least 8 characters are required.");
        }
        if (userRepository.existsById(newUser.getUsername()) || userRepository.existsByEmail(newUser.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username or email is already registered.");
        }

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return createAuthResponse(userRepository.save(newUser));
    }

    public AuthResponse authenticateUser(String usernameOrEmail, String password) {
        User user = userRepository.findById(usernameOrEmail)
                .or(() -> userRepository.findByEmail(usernameOrEmail))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password.");
        }
        return createAuthResponse(user);
    }

    private AuthResponse createAuthResponse(User user) {
        return new AuthResponse(
                tokenService.createAccessToken(user.getUsername(), user.getEmail()),
                "Bearer",
                tokenService.getAccessTtlSeconds(),
                new AuthResponse.UserProfile(user.getUsername(), user.getEmail())
        );
    }
}
