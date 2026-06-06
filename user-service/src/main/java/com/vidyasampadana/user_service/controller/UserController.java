package com.vidyasampadana.user_service.controller;


import com.vidyasampadana.user_service.entity.Admin;
import com.vidyasampadana.user_service.entity.User;
import com.vidyasampadana.user_service.entity.Student;
import com.vidyasampadana.user_service.entity.Volunteer;
import com.vidyasampadana.user_service.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    // Spring injects UserServiceImpl here automatically because it implements UserService
    private final UserService userService;

    // Endpoint to register a Student
    @PostMapping("/register/student")
    public ResponseEntity<User> registerStudent(@RequestBody Student student) {
        return ResponseEntity.ok(userService.registerUser(student));
    }

    // Endpoint to register a Volunteer
    @PostMapping("/register/volunteer")
    public ResponseEntity<User> registerVolunteer(@RequestBody Volunteer volunteer) {
        return ResponseEntity.ok(userService.registerUser(volunteer));
    }

    // Endpoint to register an Admin
    @PostMapping("/register/admin")
    public ResponseEntity<User> registerAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(userService.registerUser(admin));
    }

    // Endpoint to fetch all users (returns students, volunteers, and admins combined)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
