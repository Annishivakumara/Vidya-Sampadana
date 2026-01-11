package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "student_academic_profile")
public class student_academic_profile {

    @Id
    @Column(length = 36, nullable = false, updatable = false)
    private String id = UUID.randomUUID().toString();  //immutable universally unique identifier- 128bit

    @Column(name = "school_name" , nullable = false, unique = false)
    private String school_name;

    private enum school_board {
        ICSE, CBSC, STATE;
    }

    @Column(name = "current_class" , nullable = false, unique = false)
    private String current_class;

    @Column(name = "current_year" , nullable = false, unique = false)
    private int current_year;


    private double current_percentange;

    private enum Stream{
        SCIENCE, COMMERCE, ARTS, GENERAL , VACATION;
    }

    private String specialization;

    private String admission_no;

    private String admission_date;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
