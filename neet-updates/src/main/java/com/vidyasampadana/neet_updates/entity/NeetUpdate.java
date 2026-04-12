package com.vidyasampadana.neet_updates.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.vidyasampadana.neet_updates.entity.UpdateCategory;
import java.time.LocalDateTime;

@Entity
@Table(name = "neet_updates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NeetUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;                   // e.g. "NEET 2025 Admit Card Released"

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;             // simple plain-text explanation for users

    @Column(length = 500)
    private String sourceUrl;               // original gov/official link (optional)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    public UpdateCategory category;        // e.g. ADMIT_CARD, RESULT, SYLLABUS ...

    @Column(nullable = false)
    private Boolean isActive = true;        // admin can hide/show without deleting

    @Column(nullable = false)
    public Boolean isPinned = false;       // pin important updates to top

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}