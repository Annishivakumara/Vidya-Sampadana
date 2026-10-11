package com.vidyasampadana.user_service.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class VolunteerResponseDto extends UserResponseDto {
    private String expertise;
}