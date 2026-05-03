package com.vidyasampadana.neet_updates.dto;

import com.vidyasampadana.neet_updates.entity.UpdateCategory;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NeetUpdateResponse {
    private Long id;
    private String title;
    private String description;
    private String sourceUrl;
    private UpdateCategory category;
    public boolean isPinned;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
