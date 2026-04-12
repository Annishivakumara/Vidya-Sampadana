package com.vidyasampadana.neet_updates.dto;

import com.vidyasampadana.neet_updates.entity.UpdateCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NeetUpdateRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    private String sourceUrl;

    @NotNull(message = "Category is required")
    private UpdateCategory category;

    public Boolean isActive = true;

    public Boolean isPinned = false;
}
