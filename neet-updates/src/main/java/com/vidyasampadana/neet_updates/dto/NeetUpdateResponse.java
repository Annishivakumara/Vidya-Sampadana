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

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getSourceUrl() { return sourceUrl; }
    public UpdateCategory getCategory() { return category; }
    public boolean getIsPinned() { return isPinned; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final NeetUpdateResponse value = new NeetUpdateResponse();
        public Builder id(Long id) { value.id = id; return this; }
        public Builder title(String title) { value.title = title; return this; }
        public Builder description(String description) { value.description = description; return this; }
        public Builder sourceUrl(String sourceUrl) { value.sourceUrl = sourceUrl; return this; }
        public Builder category(UpdateCategory category) { value.category = category; return this; }
        public Builder isPinned(boolean pinned) { value.isPinned = pinned; return this; }
        public Builder createdAt(LocalDateTime createdAt) { value.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { value.updatedAt = updatedAt; return this; }
        public NeetUpdateResponse build() { return value; }
    }
}
