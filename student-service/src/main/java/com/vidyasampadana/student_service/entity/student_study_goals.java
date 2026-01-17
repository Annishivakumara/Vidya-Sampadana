package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name ="student_study_goals" )
@NoArgsConstructor
@AllArgsConstructor
public class student_study_goals {
    @Id
    @Column(name = "id", length = 36)
    private String student_goal_id;

    @Column(name = "subject_name", length = 100, nullable = false)
    private String subjectName;

    @Column(name = "goal_week_start", nullable = false)
    private LocalDate goalWeekStart;

    @Column(name = "goal_week_end", nullable = false)
    private LocalDate goalWeekEnd;

    @Column(name = "weekly_hours_goal")
    private Integer weeklyHoursGoal;

    @Column(name = "actual_hours_completed")
    private Integer actualHoursCompleted = 0;

    @Column(name = "hours_remaining")
    private Integer hoursRemaining;

    @Column(name = "completion_percentage", precision = 5, scale = 2)
    private BigDecimal completionPercentage;

    @Column(name = "topics_to_cover", length = 500)
    private String topicsToCover;

    @Column(name = "topics_completed", length = 500)
    private String topicsCompleted;

    @Enumerated(EnumType.STRING)
    @Column(name = "goal_status")
    private GoalStatus goalStatus;

    @Column(name = "notes")
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    enum GoalStatus { NOT_STARTED, IN_PROGRESS, COMPLETED, MISSED }
}
