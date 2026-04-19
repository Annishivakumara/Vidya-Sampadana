package com.vidyasampadana.kcet_updates.mapper;

import com.vidyasampadana.kcet_updates.dto.KcetUpdateRequest;
import com.vidyasampadana.kcet_updates.dto.KcetUpdateResponse;
import com.vidyasampadana.kcet_updates.entity.KcetUpdates;
import org.springframework.stereotype.Component;

@Component
public class KcetUpdateMapper {

    // Request → Entity (admin creates)
    public KcetUpdates toEntity(KcetUpdateRequest request) {
        return KcetUpdates.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .build();
    }

    // Entity → Response (user reads)
    public KcetUpdateResponse toResponse(KcetUpdates entity) {
        return KcetUpdateResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    // Request → existing Entity (admin edits)
    public void updateEntity(KcetUpdates existing, KcetUpdateRequest request) {
        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        existing.setCategory(request.getCategory());
         // ✅ setActive() not setIsActive()
    }
}