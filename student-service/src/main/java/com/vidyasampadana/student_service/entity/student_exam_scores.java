package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "student_exam_scores" )
@NoArgsConstructor
@AllArgsConstructor
public class student_exam_scores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exam_scores_id;


}
