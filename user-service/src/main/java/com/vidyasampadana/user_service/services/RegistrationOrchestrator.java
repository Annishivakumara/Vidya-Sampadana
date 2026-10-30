package com.vidyasampadana.user_service.services;

import com.vidyasampadana.user_service.entity.User;
import com.vidyasampadana.user_service.repo.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class RegistrationOrchestrator {
    private final UserRepository userRepository;
    private final UserService userService;
    private final IdentityServiceClient identityServiceClient;

    public RegistrationOrchestrator(UserRepository userRepository, UserService userService,
                                    IdentityServiceClient identityServiceClient) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.identityServiceClient = identityServiceClient;
    }

    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalStateException("Email is already registered.");
        }

        identityServiceClient.createIdentity(user.getEmail(), user.getPassword());
        try {
            return userService.registerUser(user);
        } catch (RuntimeException profileFailure) {
            try {
                identityServiceClient.deleteIdentity(user.getEmail());
            } catch (RuntimeException compensationFailure) {
                profileFailure.addSuppressed(compensationFailure);
            }
            throw profileFailure;
        }
    }
}
