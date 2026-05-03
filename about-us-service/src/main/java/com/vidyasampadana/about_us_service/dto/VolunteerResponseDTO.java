package com.vidyasampadana.about_us_service.dto;

import com.vidyasampadana.about_us_service.entity.Volunteer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerResponseDTO {

    private Long id;
    private String name;
    private Volunteer.Domain domain;
    private String imageUrl;
    private String linkedinUrl;
    private Boolean active;
    private LocalDate joinedDate;
    private LocalDateTime createdAt;
}