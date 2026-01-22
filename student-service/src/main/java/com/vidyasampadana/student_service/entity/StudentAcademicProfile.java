package com.vidyasampadana.student_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Data
@Table(name = "student_academic_profile")
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicProfile  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  student_academic_id;


    @Column(name = "school_name", length = 255)
    private String schoolName;

    @Enumerated(EnumType.STRING)
    @Column(name = "school_board")
    private SchoolBoard schoolBoard;

    @Column(name = "current_class", length = 50)
    private String currentClass;

    @Column(name = "current_academic_year")
    private String currentAcademicYear;

    @Column(name = "current_score_percentage", precision = 5, scale = 2)
    private BigDecimal currentScorePercentage;

    @Enumerated(EnumType.STRING)
    @Column(name = "stream")
    private AcademicStream stream;

    @Column(name = "specialization", length = 100)
    private String specialization;


    @Column(name = "admission_date")
    private LocalDate admissionDate;

    public enum SchoolBoard { CBSE, ICSE, STATE, IB, IGCSE, OTHER }
    public enum AcademicStream { SCIENCE, COMMERCE, ARTS, GENERALL }
}
