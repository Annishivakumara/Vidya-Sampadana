package com.vidyasampadana.student_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "student_academic_profile")
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicProfile  {

<<<<<<< HEAD
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
=======
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
>>>>>>> sub_me/main
    @Column(name = "academic_id") // <-- match DB column
    @EqualsAndHashCode.Include
    private Long studentAcaId;


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


}
