package com.vidyasampadana.user_service.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AdminResponseDto extends UserResponseDto {
    // Ready for admin-specific fields later (e.g., clearanceLevel)
}