package com.vidyasampadana.iamservice.controller;

import com.vidyasampadana.iamservice.dto.UserDto;
import com.vidyasampadana.iamservice.entity.User;
import com.vidyasampadana.iamservice.services.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {
    private   final UserService userService;

    @PostMapping
    public ResponseEntity<UserDto>  createuser(@RequestBody UserDto userDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDto));
    }

    @GetMapping
    public ResponseEntity<Iterable<UserDto>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("userId") String userId){
        return ResponseEntity.ok(userService.getuserById(userId));
    }
    //getUser ById
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable("email")String email){
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    //deleteing user
    // api/v1/users/{userid}
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") String userId){
        userService.deleteUser(userId);
    }

    // updateing The User Detials
    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto , @PathVariable("userId") String userId){
        return ResponseEntity.ok(userService.updateUser(userDto, userId));
    }


}
