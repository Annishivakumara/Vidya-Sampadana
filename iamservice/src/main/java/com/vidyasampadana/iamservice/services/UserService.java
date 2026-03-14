package com.vidyasampadana.iamservice.services;

import com.vidyasampadana.iamservice.dto.UserDto;
import org.springframework.stereotype.Service;


public interface UserService {

    //creating User
    UserDto createUser(UserDto userDto);

    // get User details By Email

    UserDto getUserByEmail(String email);

    // update User
    UserDto updateUser(UserDto userDto , String userId);

    // delete User
    void deleteUser(String userId);

    //get User By Id
    UserDto getuserById(String userId);

    // get  ALl userr
    Iterable<UserDto> getAllUsers();

}
