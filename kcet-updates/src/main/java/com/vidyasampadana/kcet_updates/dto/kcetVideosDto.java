package com.vidyasampadana.kcet_updates.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class kcetVideosDto {
    private String caption;
    private String fileType;
    private String comments;
    private int likeCount;
}
