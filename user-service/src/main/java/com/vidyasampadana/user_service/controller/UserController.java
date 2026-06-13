package com.vidyasampadana.user_service.controller;


import com.vidyasampadana.user_service.dto.UserResponseDto;
import com.vidyasampadana.user_service.entity.Admin;
import com.vidyasampadana.user_service.entity.User;
import com.vidyasampadana.user_service.entity.Student;
import com.vidyasampadana.user_service.entity.Volunteer;
import com.vidyasampadana.user_service.mapper.UserMapper;
import com.vidyasampadana.user_service.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    // Spring injects UserServiceImpl here automatically because it implements UserService
    private final UserService userService;
    //Mapper Injecting
    private final UserMapper userMapper;

    // Endpoint to register a Student
    @PostMapping("/register/student")
    public ResponseEntity<UserResponseDto> registerStudent(@Valid @RequestBody Student student) {
        var savedStudent = userService.registerUser(student);
        return ResponseEntity.ok(userMapper.toDto(savedStudent));
    }

    // Endpoint to register a Volunteer
    @PostMapping("/register/volunteer")
    public ResponseEntity<UserResponseDto> registerVolunteer(@Valid @RequestBody Volunteer volunteer) {
        var savedVolunteer = userService.registerUser(volunteer);
        return ResponseEntity.ok(userMapper.toDto(savedVolunteer));
    }

    // Endpoint to register an Admin
    @PostMapping("/register/admin")
    public ResponseEntity<UserResponseDto> registerAdmin(@Valid @RequestBody Admin admin) {
        var savedAdmin = userService.registerUser(admin);
        return ResponseEntity.ok(userMapper.toDto(savedAdmin));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id){
        User user= userService.getUserById(id);
        return ResponseEntity.ok(userMapper.toDto(user));
    }

    // Endpoint to fetch all users (returns students, volunteers, and admins combined)
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto>  dtos= userService.getAllUsers().stream()
                .map(userMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
