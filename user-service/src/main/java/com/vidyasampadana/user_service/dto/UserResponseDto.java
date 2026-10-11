package com.vidyasampadana.user_service.dto;

import lombok.Data;

@Data
public abstract class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String role; // We can explicitly expose the role name here
}