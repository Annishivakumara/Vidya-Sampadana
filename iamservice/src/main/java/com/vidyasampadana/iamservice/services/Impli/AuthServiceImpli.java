package com.vidyasampadana.iamservice.services.Impli;

import com.vidyasampadana.iamservice.dto.UserDto;
import com.vidyasampadana.iamservice.services.AuthService;
import com.vidyasampadana.iamservice.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpli implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto registerUser(UserDto userDto) {

        //TODO: logic need to add here
        //TODO: varify email
        //TODO  varify password
        //deafult role

        // encoded passsword
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        UserDto userDto1=userService.createUser(userDto);
        return userDto1;
    }
}
