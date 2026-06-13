package com.vidyasampadana.user_service.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class StudentResponseDto extends UserResponseDto {
    private String institutionName;
}
