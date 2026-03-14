package com.vidyasampadana.kcet_updates.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "KcetUpdateTags")
@NoArgsConstructor
@AllArgsConstructor
public class KcetUpdateTags {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "updateTagId")
    private  Long updateTagId;

    @Enumerated(EnumType.STRING)
    @Column(name = "update_tag")
    private  Tags tag;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    @Column(name = "deletedAt")
    private LocalDateTime deletedAt;

    enum  Tags {
        KCET, VERIFICATION, ROUND1, ROUND2, ROUND3
    }
}
