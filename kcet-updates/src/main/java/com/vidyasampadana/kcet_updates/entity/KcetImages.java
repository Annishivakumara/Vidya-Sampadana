package com.vidyasampadana.kcet_updates.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "KcetImages")
@Entity
public class KcetImages {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "image_id")
    private Long image_id;

    @Column(name = "url")
    private String url;

    @Column(name = "caption")
    private String caption;

    @Column(name = "fileType")
    private FileType fileType;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "deletedAt")
    private  LocalDateTime deletedAt;

    public  enum FileType{
        png, jpg,
    }
}