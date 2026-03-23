package com.vidyasampadana.iamservice.services;

import com.vidyasampadana.iamservice.dto.UserDto;

public interface AuthService {
    UserDto registerUser(UserDto userDto);

    // login User
}
