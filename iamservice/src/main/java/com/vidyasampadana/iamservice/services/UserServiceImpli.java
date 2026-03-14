package com.vidyasampadana.iamservice.services;

import com.vidyasampadana.iamservice.dto.UserDto;
import com.vidyasampadana.iamservice.entity.Provider;
import com.vidyasampadana.iamservice.entity.User;
import com.vidyasampadana.iamservice.exception.ResourceNotFoundException;
import com.vidyasampadana.iamservice.helper.UserHelper;
import com.vidyasampadana.iamservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpli implements  UserService{

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserDto createUser(UserDto userDto) {
        if(userDto.getEmail()==null || userDto.getEmail().isBlank()){
            throw new IllegalArgumentException("Email is required");
        }
        if(userRepository.existsByEmail(userDto.getEmail())){
        throw  new IllegalArgumentException("User With given EMail Alredy Esists");
        }
        User user=modelMapper.map(userDto, User.class);
        user.setProvider(userDto.getProvider()!=null ? userDto.getProvider(): Provider.LOCAL);
        //role assign
        User savedUser=userRepository.save(user);
        return  modelMapper.map(savedUser, UserDto.class);
    }
    @Override
    public UserDto getUserByEmail(String email) {
      User user=  userRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("User Not Found By the given Email!!"));
      return modelMapper.map(user, UserDto.class);
    }
    @Override
    public UserDto updateUser(UserDto userDto, String userId) {
        UUID uuid= UserHelper.parseUUID(userId);
        User existingUser=userRepository.findById(uuid).orElseThrow(()-> new ResourceNotFoundException("User not Found With this id"));
        // we are not changed email id for this
        if(userDto.getName()!=null ){
            existingUser.setName(userDto.getName());
        }
        if(userDto.getImage()!=null){
            existingUser.setImage(userDto.getImage());
        }
        if(userDto.getProvider()!=null) {
            existingUser.setProvider(userDto.getProvider());
        }
        //TODO: Change The Password Updation Logic
        if(userDto.getPassword()!=null){
            existingUser.setPassword(userDto.getPassword());
        }
        // add other Information of the User if You want !!  than  update logic here,   notify it
        existingUser.setEnable(userDto.isEnable());
        existingUser.setUpdatedAt(Instant.now());
        User updatedUser=userRepository.save(existingUser);
        return modelMapper.map(updatedUser, UserDto.class);
    }
    @Override
    public void deleteUser(String userId) {
        UUID uuid= UserHelper.parseUUID(userId);
        User user= userRepository.findByEmail(userId).orElseThrow(()-> new ResourceNotFoundException("user With this Id Not Exists"));
        userRepository.delete(user);
    }
    @Override
    public UserDto getuserById(String userId) {
       User user=  userRepository.findById(UserHelper.parseUUID(userId)).orElseThrow(()-> new ResourceNotFoundException("user not found With Given Id "));
        return modelMapper.map(user, UserDto.class);
    }
    @Override
    @Transactional(readOnly = true)
    public Iterable<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user , UserDto.class))
                .toList();
    }
}