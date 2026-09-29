package com.vidyasampadana.iamservice.dto;

public record AuthResponse(String accessToken, String tokenType, long expiresIn, UserProfile user) {
    public record UserProfile(String username, String email) { }
}
