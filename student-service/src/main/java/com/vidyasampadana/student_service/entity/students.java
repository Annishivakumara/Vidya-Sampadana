package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Entity
@Table(name = "students")
@AllArgsConstructor
@NoArgsConstructor
public class students {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Id
    @Column(name = "userId" , nullable = false, unique = true)
    private String userId;

    @Column(name = "examType" , nullable = false)
    private String examType;

    @Column(name = "currentYear" , nullable = false)
    private String currentYear;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "profile_update", nullable = false)
    private int  profile_update;

    @Column(name = "created_at" , nullable = false)
    private String created_at;

    @Column(name = "updated_at" , nullable = false)
    private String updated_at;
}
