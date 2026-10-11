package com.vidyasampadana.kcet_updates.dto;

import com.vidyasampadana.kcet_updates.entity.KcetCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KcetUpdateRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must be at most 200 characters")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Category is required")
    private KcetCategory category;

    private boolean isActive = true;    // ✅ primitive — isActive() + setActive()
}