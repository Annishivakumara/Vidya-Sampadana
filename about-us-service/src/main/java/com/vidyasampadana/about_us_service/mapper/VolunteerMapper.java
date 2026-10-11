package com.vidyasampadana.about_us_service.mapper;

import com.vidyasampadana.about_us_service.dto.VolunteerRequestDTO;
import com.vidyasampadana.about_us_service.dto.VolunteerResponseDTO;
import com.vidyasampadana.about_us_service.entity.Volunteer;
import org.springframework.stereotype.Component;

@Component
public class VolunteerMapper {

    // RequestDTO → Entity (used when saving)
    public Volunteer toEntity(VolunteerRequestDTO dto) {
        return Volunteer.builder()
                .name(dto.getName())
                .domain(dto.getDomain())
                .imageUrl(dto.getImageUrl())
                .linkedinUrl(dto.getLinkedinUrl())
                .joinedDate(dto.getJoinedDate())
                .build();
    }

    // Entity → ResponseDTO (used when returning to frontend)
    public VolunteerResponseDTO toResponseDTO(Volunteer entity) {
        return VolunteerResponseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .domain(entity.getDomain())
                .imageUrl(entity.getImageUrl())
                .linkedinUrl(entity.getLinkedinUrl())
                .active(entity.getActive())
                .joinedDate(entity.getJoinedDate())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}