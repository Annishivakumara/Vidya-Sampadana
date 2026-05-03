package com.vidyasampadana.student_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentExamScoresDTO {
    @NotBlank(message = "Exam name is required")
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


    @NotNull(message = "Total score is required")
    private BigDecimal totalScore;
    private BigDecimal totalMarks;

    private Integer examRank;

}
