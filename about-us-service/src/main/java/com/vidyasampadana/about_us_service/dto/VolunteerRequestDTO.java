package com.vidyasampadana.about_us_service.dto;



import com.vidyasampadana.about_us_service.entity.Volunteer;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Domain is required")
    private Volunteer.Domain domain;

    private String imageUrl;

    private String linkedinUrl;

    @NotNull(message = "Joined date is required")
    private LocalDate joinedDate;
}