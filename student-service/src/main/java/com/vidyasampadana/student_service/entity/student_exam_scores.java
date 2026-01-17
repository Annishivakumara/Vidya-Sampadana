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
@Table(name = "student_exam_scores" )
@NoArgsConstructor
@AllArgsConstructor
public class student_exam_scores {
    @Id
    @Column(name = "id", length = 36)
    private String student_exam_id;

    @Column(name = "exam_name", length = 255, nullable = false)
    private String examName;

    @Column(name = "exam_date")
    private LocalDate examDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "exam_type")
    private ExamType examType;

    @Column(name = "subject_1_name", length = 100)
    private String subject1Name;

    @Column(name = "subject_1_score", precision = 5, scale = 2)
    private BigDecimal subject1Score;

    @Column(name = "subject_1_out_of", precision = 5, scale = 2)
    private BigDecimal subject1OutOf;

    @Column(name = "subject_2_name", length = 100)
    private String subject2Name;

    @Column(name = "subject_2_score", precision = 5, scale = 2)
    private BigDecimal subject2Score;

    @Column(name = "subject_2_out_of", precision = 5, scale = 2)
    private BigDecimal subject2OutOf;

    @Column(name = "subject_3_name", length = 100)
    private String subject3Name;

    @Column(name = "subject_3_score", precision = 5, scale = 2)
    private BigDecimal subject3Score;

    @Column(name = "subject_3_out_of", precision = 5, scale = 2)
    private BigDecimal subject3OutOf;

    @Column(name = "total_score", precision = 6, scale = 2)
    private BigDecimal totalScore;

    @Column(name = "total_marks", precision = 6, scale = 2)
    private BigDecimal totalMarks;

    @Column(name = "percentage", precision = 5, scale = 2)
    private BigDecimal percentage;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "all_india_rank")
    private Integer allIndiaRank;

    @Column(name = "accuracy_percentage", precision = 5, scale = 2)
    private BigDecimal accuracyPercentage;

    @Column(name = "time_spent_minutes")
    private Integer timeSpentMinutes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    enum ExamType { MOCK, MAINS, ADVANCED, ACTUAL, OTHER }
}
