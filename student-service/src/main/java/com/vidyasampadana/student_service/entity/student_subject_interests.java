package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_subject_interests")
public class student_subject_interests {
    @Id
    @Column(name = "id", length = 36)
    private String student_sub_id;

    @Column(name = "subject_name", length = 100, nullable = false)
    private String subjectName;

    @Column(name = "interest_level")
    private Integer interestLevel;

    @Column(name = "current_score", precision = 6, scale = 2)
    private BigDecimal currentScore;

    @Column(name = "current_score_percentage", precision = 5, scale = 2)
    private BigDecimal currentScorePercentage;

    @Column(name = "target_score", precision = 6, scale = 2)
    private BigDecimal targetScore;

    @Column(name = "target_percentage", precision = 5, scale = 2)
    private BigDecimal targetPercentage;

    @Column(name = "score_improvement_needed", precision = 6, scale = 2)
    private BigDecimal scoreImprovementNeeded;

    @Enumerated(EnumType.STRING)
    @Column(name = "comfort_level")
    private ComfortLevel comfortLevel;

    @Column(name = "favorite_topics", length = 500)
    private String favoriteTopics;

    @Column(name = "difficult_topics", length = 500)
    private String difficultTopics;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    enum ComfortLevel { WEAK, AVERAGE, GOOD, EXCELLENT }
}