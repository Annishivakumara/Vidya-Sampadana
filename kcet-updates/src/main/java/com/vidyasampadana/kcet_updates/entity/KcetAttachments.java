package com.vidyasampadana.kcet_updates.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "KcetAttachments")
@Entity
public class KcetAttachments {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "attachment_id")
        private Long attachment_id;

        @Column(name = "OfficialPdfs")
        private String OfficialPdfs;

        @Column(name = "notices")
        private String notices;

        @Column(name = "ExcelWordFiles")
        private String ewFiles;

        @Column(name = "scannedCirculars")
        private String ScannedCirculars;

        @Column(name = "createdAt")
        private LocalDateTime createdAt;

        @Column(name = "updatedAt")
        private LocalDateTime updatedAt;

        @Column(name = "deletedAt")
        private LocalDateTime deletedAt;

}
