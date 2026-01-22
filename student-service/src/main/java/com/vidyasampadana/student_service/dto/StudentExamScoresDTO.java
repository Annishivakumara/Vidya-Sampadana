package com.vidyasampadana.student_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentExamScoresDTO {
    private String id;
    private String examName;
    private LocalDate examDate;
    private String examType;

    private String subject1Name;
    private BigDecimal subject1Score;
    private BigDecimal subject1OutOf;

    private String subject2Name;
    private BigDecimal subject2Score;
    private BigDecimal subject2OutOf;

    private String subject3Name;
    private BigDecimal subject3Score;
    private BigDecimal subject3OutOf;

    private BigDecimal totalScore;
    private BigDecimal totalMarks;
    private BigDecimal percentage;
    private Integer examRank;

}
