package com.vidyasampadana.student_service.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicProfileDTO {

    @NotBlank(message = "School name is required")
    private String schoolName;
    private String schoolBoard;

    @NotBlank(message = "Current class is required")
    private String currentClass;

    private String currentAcademicYear;

    @DecimalMin(value = "0.0", message = "Score percentage cannot be negative")
    @DecimalMax(value="100.0" , message = "Score Percentage Cannot be exceed 100")
    private BigDecimal currentScorePercentage;
    private String stream;
    private String specialization;
    private LocalDate admissionDate;
}
