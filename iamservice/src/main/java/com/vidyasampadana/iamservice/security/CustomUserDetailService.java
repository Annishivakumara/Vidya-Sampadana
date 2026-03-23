package com.vidyasampadana.iamservice.security;

import com.vidyasampadana.iamservice.entity.User;
import com.vidyasampadana.iamservice.exception.ResourceNotFoundException;
import com.vidyasampadana.iamservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       return userRepository.findByEmail(username).orElseThrow(()->
            new ResourceNotFoundException("Invalid Email or Password")
        );
    }
}
