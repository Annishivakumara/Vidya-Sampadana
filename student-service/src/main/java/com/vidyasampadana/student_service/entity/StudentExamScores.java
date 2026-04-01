package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "student_exam_scores")
@NoArgsConstructor
@AllArgsConstructor
public class StudentExamScores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_id")
    @EqualsAndHashCode.Include
    private Long examId;

    @Column(name = "exam_name", length = 255, nullable = false)
    private String examName;

    @Column(name = "exam_date")
    private LocalDate examDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "exam_type", length = 20)
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

    @Column(name = "total_score", precision = 6, scale = 2, nullable = false)
    private BigDecimal totalScore;

    @Column(name = "total_marks", precision = 6, scale = 2)
    private BigDecimal totalMarks;

    @Column(name = "percentage", precision = 5, scale = 2)
    private BigDecimal percentage;

    @Column(name = "exam_rank")
    private Integer examRank;

    @PrePersist
    @PreUpdate
    public void calculatePercentage() {
        if (totalScore != null && totalMarks != null && totalMarks.compareTo(BigDecimal.ZERO) > 0) {
            this.percentage = totalScore
                    .multiply(BigDecimal.valueOf(100))
                    .divide(totalMarks, 2, RoundingMode.HALF_UP);
        }
    }
}