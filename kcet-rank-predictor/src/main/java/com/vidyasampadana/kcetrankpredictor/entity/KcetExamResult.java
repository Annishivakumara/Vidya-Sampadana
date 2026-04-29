package com.vidyasampadana.kcetrankpredictor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "kcet_exam_results")
public class KcetExamResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;        // links to student-service

    private Double physicsMarks;     // out of 60
    private Double chemistryMarks;   // out of 60
    private Double mathsMarks;       // out of 60
    private Double totalMarks;       // out of 180

    private Integer examYear;        // 2024, 2025...

    @Enumerated(EnumType.STRING)
    private ExamCategory category;   // GM, SC, ST, OBC...

    private LocalDateTime createdAt;
}