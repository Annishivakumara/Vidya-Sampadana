package com.vidyasampadana.kcet_updates.entity;
import com.vidyasampadana.kcet_updates.entity.KcetCategory;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
    @Entity
    @Table(name = "kcet_updates")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class KcetUpdates {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, length = 200)
        private String title;

        @Column(columnDefinition = "TEXT", nullable = false)
        private String description;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false, length = 30)
        private KcetCategory category;

        @Column(nullable = false)
        private Boolean isActive =true;

        @CreationTimestamp
        @Column(updatable = false)
        private LocalDateTime createdAt;

        @UpdateTimestamp
        private LocalDateTime updatedAt;
    }
