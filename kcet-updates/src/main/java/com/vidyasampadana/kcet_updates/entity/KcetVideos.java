package com.vidyasampadana.kcet_updates.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "KcetVideos")
public class KcetVideos {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "videoId")
    private Long videoId;

    @Column(name = "url")
    private String url;

    @Column(name = "caption")
    private String caption;

    @Column(name = "fileType")
    private FileType fileType;

    @Column(name="comments")
    private  String comments;

    @Column(name = "likeCount")
    private int likeCount;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    @Column(name = "deletedAt")
    private  LocalDateTime deletedAt;

    public  enum  FileType{
      mp4, mp3
    };
}