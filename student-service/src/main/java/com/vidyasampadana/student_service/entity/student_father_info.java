package com.vidyasampadana.student_service.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Embeddable
public class student_father_info {


    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "occupation", length = 100)
    private String occupation;

    @Column(name = "company", length = 255)
    private String company;

    @Column(name = "designation", length = 100)
    private String designation;

    @Column(name = "age")
    private Integer age;

    @Column(name = "qualification", length = 100)
    private String qualification;

    @Column(name = "is_alive")
    private Boolean isAlive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}