package com.vidyasampadana.kcetrankpredictor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "kcet_cutoff_data")
public class KcetCutoffData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String collegeName;
    private String collegeCode;
    private String branchName;
    private String branchCode;

    @Enumerated(EnumType.STRING)
    private ExamCategory category;

    private Double cutoffMarks;
    private Integer cutoffRank;
    private Integer examYear;        // historical year
}