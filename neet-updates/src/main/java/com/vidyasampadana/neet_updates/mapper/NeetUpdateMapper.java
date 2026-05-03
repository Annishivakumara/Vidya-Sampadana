package com.vidyasampadana.neet_updates.mapper;

import com.vidyasampadana.neet_updates.dto.NeetUpdateRequest;
import com.vidyasampadana.neet_updates.dto.NeetUpdateResponse;
import com.vidyasampadana.neet_updates.entity.NeetUpdate;
import org.springframework.stereotype.Component;

@Component
public class NeetUpdateMapper {

    // Request → Entity (admin creates)
    public NeetUpdate toEntity(NeetUpdateRequest request) {
        return NeetUpdate.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .sourceUrl(request.getSourceUrl())
                .category(request.getCategory())
                .isActive(request.getIsActive())
                .isPinned(request.getIsPinned())
                .build();
    }

    // Entity → Response (user reads)
    public NeetUpdateResponse toResponse(NeetUpdate entity) {
        return NeetUpdateResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .sourceUrl(entity.getSourceUrl())
                .category(entity.getCategory())
                .isPinned(entity.getIsPinned())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    // Request → existing Entity (admin edits)
    public void updateEntity(NeetUpdate existing, NeetUpdateRequest request) {
        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        existing.setSourceUrl(request.getSourceUrl());
        existing.setCategory(request.getCategory());
        existing.setIsActive(request.getIsActive());
        existing.setIsPinned(request.getIsPinned());
    }
}