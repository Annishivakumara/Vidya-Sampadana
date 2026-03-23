package com.vidyasampadana.iamservice.dto;

import com.vidyasampadana.iamservice.entity.Provider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserDto {
    private UUID id;
    private String email;

    private String name;
    private String password;
    private String image;
    private boolean enable = true;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
    public Provider provider = Provider.LOCAL;
    private Set<RoleDto> roles = new HashSet<>();

}
