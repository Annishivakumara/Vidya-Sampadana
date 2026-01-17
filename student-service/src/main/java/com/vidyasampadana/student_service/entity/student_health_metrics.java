package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "student_health_metrics")
public class student_health_metrics {
    @Id
    @Column(name = "id", length = 36)
    private String student_health_id;

    // Sleep Metrics
    @Column(name = "sleep_hours", precision = 4, scale = 2)
    private BigDecimal sleepHours;

    @Column(name = "sleep_quality")
    private Integer sleepQuality;

    @Column(name = "sleep_consistency_percentage", precision = 5, scale = 2)
    private BigDecimal sleepConsistencyPercentage;

    // Study Metrics
    @Column(name = "weekly_study_hours")
    private Integer weeklyStudyHours;

    @Column(name = "study_consistency_percentage", precision = 5, scale = 2)
    private BigDecimal studyConsistencyPercentage;

    // Focus & Productivity
    @Column(name = "focus_score")
    private Integer focusScore;

    @Column(name = "distraction_level")
    private Integer distractionLevel;

    // Health Status
    @Enumerated(EnumType.STRING)
    @Column(name = "overall_health_status")
    private HealthStatus overallHealthStatus;

    @Column(name = "stress_level")
    private Integer stressLevel;

    @Column(name = "exercise_frequency_per_week")
    private Integer exerciseFrequencyPerWeek;

    // Diet
    @Column(name = "meals_per_day")
    private Integer mealsPerDay;

    @Column(name = "water_intake_liters", precision = 4, scale = 2)
    private BigDecimal waterIntakeLiters;

    @Column(name = "caffeine_intake_per_day")
    private Integer caffeineIntakePerDay;

    // Mental Health
    @Column(name = "motivation_level")
    private Integer motivationLevel;

    @Column(name = "confidence_level")
    private Integer confidenceLevel;

    @Column(name = "anxiety_level")
    private Integer anxietyLevel;

    @Column(name = "last_updated_date")
    private LocalDate lastUpdatedDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    enum HealthStatus { POOR, AVERAGE, GOOD, EXCELLENT }
}
