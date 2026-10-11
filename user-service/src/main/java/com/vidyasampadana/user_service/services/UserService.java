package com.vidyasampadana.user_service.services;

import com.vidyasampadana.user_service.entity.User;

import java.util.List;

public interface UserService {
    User registerUser(User user);
    List<User> getAllUsers();

    User getUserById(Long id);
}
