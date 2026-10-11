package com.vidyasampadana.about_us_service.dto;


import com.vidyasampadana.about_us_service.entity.CoreTeamMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoreTeamMemberResponseDTO {

    private Long id;
    private String name;
    private CoreTeamMember.Designation designation;
    private String bio;
    private String imageUrl;
    private String linkedinUrl;
    private Integer displayOrder;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}