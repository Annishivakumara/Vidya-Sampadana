package com.vidyasampadana.about_us_service.dto;


import com.vidyasampadana.about_us_service.entity.CoreTeamMember;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoreTeamMemberRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Designation is required")
    private CoreTeamMember.Designation designation;

    @NotBlank(message = "Bio is required")
    private String bio;

    private String imageUrl;

    private String linkedinUrl;

    @NotNull(message = "Display order is required")
    private Integer displayOrder;
}