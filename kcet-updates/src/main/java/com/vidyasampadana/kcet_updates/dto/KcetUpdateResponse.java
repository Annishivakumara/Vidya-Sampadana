package com.vidyasampadana.kcet_updates.dto;

import com.vidyasampadana.kcet_updates.entity.KcetCategory;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KcetUpdateResponse {

    private Long id;
    private String title;
    private String description;
    private KcetCategory category;
    private LocalDateTime createdAt;    // users see when it was posted
}