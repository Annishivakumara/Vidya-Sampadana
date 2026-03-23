package com.vidyasampadana.kcet_updates.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KcetupdatesRequestDTO {
    private String title;
    private String content;
    private String updateType;
    private Date publishDate;
    private Date expiryDate;
    private int priority;
    private String status;
    private boolean isActive;
    private boolean featured;
    private  String category;
    private  String tags;
    private String audience;
    private KcetImagesDTO kcetImages;
    private KcetVideosDto kcetVideos;
    private  String sourceUrl;
    private int viewCount;
}
