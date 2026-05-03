package com.vidyasampadana.about_us_service.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "volunteer")
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Volunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Domain domain;

    private String imageUrl;

    private String linkedinUrl;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    private LocalDate joinedDate;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public enum Domain {
        CONTENT,
        DESIGN,
        TECH,
        OUTREACH,
        MENTOR
    }
}