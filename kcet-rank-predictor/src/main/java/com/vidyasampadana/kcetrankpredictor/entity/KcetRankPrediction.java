package com.vidyasampadana.kcetrankpredictor.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "kcet_rank_predictions")
@ToString(exclude = "eligibleColleges")
@EqualsAndHashCode(exclude = "eligibleColleges")
public class KcetRankPrediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private Double totalMarks;
    private Integer predictedRankMin;   // rank range ex: 1200
    private Integer predictedRankMax;   // rank range ex: 1800

    @Enumerated(EnumType.STRING)
    private ExamCategory category;

    private Integer predictionYear;

    @OneToMany(mappedBy = "prediction", cascade = CascadeType.ALL)
    private List<KcetCollegePrediction> eligibleColleges;

    private LocalDateTime predictedAt;
}