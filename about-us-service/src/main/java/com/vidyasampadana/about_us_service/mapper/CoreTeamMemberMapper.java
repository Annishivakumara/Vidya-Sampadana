package com.vidyasampadana.about_us_service.mapper;


import com.vidyasampadana.about_us_service.dto.CoreTeamMemberRequestDTO;
import com.vidyasampadana.about_us_service.dto.CoreTeamMemberResponseDTO;
import com.vidyasampadana.about_us_service.entity.CoreTeamMember;
import org.springframework.stereotype.Component;

@Component
public class CoreTeamMemberMapper {

    // RequestDTO → Entity (used when saving)
    public CoreTeamMember toEntity(CoreTeamMemberRequestDTO dto) {
        return CoreTeamMember.builder()
                .name(dto.getName())
                .designation(dto.getDesignation())
                .bio(dto.getBio())
                .imageUrl(dto.getImageUrl())
                .linkedinUrl(dto.getLinkedinUrl())
                .displayOrder(dto.getDisplayOrder())
                .build();
    }

    // Entity → ResponseDTO (used when returning to frontend)
    public CoreTeamMemberResponseDTO toResponseDTO(CoreTeamMember entity) {
        return CoreTeamMemberResponseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .designation(entity.getDesignation())
                .bio(entity.getBio())
                .imageUrl(entity.getImageUrl())
                .linkedinUrl(entity.getLinkedinUrl())
                .displayOrder(entity.getDisplayOrder())
                .active(entity.getActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}