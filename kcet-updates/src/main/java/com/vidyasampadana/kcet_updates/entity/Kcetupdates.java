package com.vidyasampadana.kcet_updates.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="KcetUpdates")
public class Kcetupdates {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long kcetId;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "updateType")
    private UpdateType updateType;


    @Column(name = "publishDate")
    private LocalDateTime publishDate ;

    @Column(name = "expiryDate")
    private LocalDateTime expiryDate;

    @Column(name = "priority")
    private int priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "isNew")
    private boolean isNew;

    @Column(name = "isActive")
    private boolean isActive;

    @Column(name = "featured")
    private boolean featured;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(name = "tags")
    private KcetUpdateTags tags;

    @Enumerated(EnumType.STRING)
    @Column(name = "audience")
    private Audience audience;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "imageId")
    private List<KcetImages> kcetImages;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "videoId")
    private List<KcetVideos> kcetVideos;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "attachment_id")
    private  List<KcetAttachments> attachments;

    @Column(name = "sourceUrl")
    private  String sourceUrl;

    @Column(name = "viewCount")
    private int viewCount;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "updatedAt")
    private  LocalDateTime updatedAt;

    @Column(name = "deletedAt")
    private LocalDateTime deletedAt;


    public  enum Status{
        PUBLISHED, NOT_PUBLISHED
    };

    public enum  UpdateType{
        DOCUMENT_VERIFICATION,
        OPTION_ENTRY, SEAT_MATRIX, FEE_STRUCTURE,
        MOCK_ALLOTMENT, CORRECTION_WINDOW,
        NOTIFICATION, EXAM_DATE, COUNSELLING, RESULT, ALERT
    };

    public enum  Category{
        KCET , NEET, JEE, OTHER
    }
    public enum  Audience{
        KCET , NEET, JEE,
    }
}
