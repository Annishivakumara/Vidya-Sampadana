package com.vidyasampadana.kcetrankpredictor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "kcet_college_predictions")
public class KcetCollegePrediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prediction_id")
    private KcetRankPrediction prediction;

    private String collegeName;
    private String branchName;

    @Enumerated(EnumType.STRING)
    private PredictionChance chance;    // HIGH, MEDIUM, LOW
}