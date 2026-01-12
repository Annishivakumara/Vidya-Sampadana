package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "student_academic_profile")
@NoArgsConstructor
@AllArgsConstructor
public class student_academic_profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stu_academic_id;  //immutable universally unique identifier- 128bit

    @Column(name = "school_name" , nullable = false, unique = false)
    private String school_name;

    private enum school_board {
        ICSE, CBSC, STATE;
    }

    @Column(name = "current_class" , nullable = false, unique = false)
    private String current_class;

    @Column(name = "current_year" , nullable = false, unique = false)
    private int current_year;

    @Column(name = "current_percent")
    private double current_percentange;

    private enum Stream{
        SCIENCE, COMMERCE, ARTS, GENERAL , VACATION;
    }

    @Column(name = "specialization", nullable = false)
    private String specialization;

    @Column(name = "admission_no")
    private String admission_no;

    @Column(name="admission_data")
    private String admission_date;

    @Column(name="createdAt", nullable = false , columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name="updatedAt", nullable = false , columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

}
