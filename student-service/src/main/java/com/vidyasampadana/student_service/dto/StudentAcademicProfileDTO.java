package com.vidyasampadana.student_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicProfileDTO {
    private String schoolName;
    private String schoolBoard;
    private String currentClass;
    private String currentAcademicYear;
    private BigDecimal currentScorePercentage;
    private String stream;
    private String specialization;
    private LocalDate admissionDate;
}
