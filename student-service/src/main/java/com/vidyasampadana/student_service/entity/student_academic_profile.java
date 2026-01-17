package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.UUID;

@Entity
@Data
@Table(name = "student_academic_profile")
@NoArgsConstructor
@AllArgsConstructor
public class student_academic_profile {
    @Id
    @Column(name = "id", length = 36)
    private String student_academic_id;

    @Column(name = "school_name", length = 255)
    private String schoolName;

    @Enumerated(EnumType.STRING)
    @Column(name = "school_board")
    private SchoolBoard schoolBoard;

    @Column(name = "current_class", length = 50)
    private String currentClass;

    @Column(name = "current_academic_year")
    private Year currentAcademicYear;

    @Column(name = "current_score_percentage", precision = 5, scale = 2)
    private BigDecimal currentScorePercentage;

    @Enumerated(EnumType.STRING)
    @Column(name = "stream")
    private AcademicStream stream;

    @Column(name = "specialization", length = 100)
    private String specialization;

    @Column(name = "admission_number", length = 50)
    private String admissionNumber;

    @Column(name = "admission_date")
    private LocalDate admissionDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    enum SchoolBoard { CBSE, ICSE, STATE, IB, IGCSE, OTHER }
    enum AcademicStream { SCIENCE, COMMERCE, ARTS, GENERAL, VOCATIONAL }
}
