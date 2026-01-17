package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Embeddable
public class student_guardian_info {


    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "email", length = 255)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "relationship", nullable = false)
    private GuardianRelationship relationship;

    @Column(name = "occupation", length = 100)
    private String occupation;

    @Column(name = "company", length = 255)
    private String company;

    @Column(name = "age")
    private Integer age;

    @Column(name = "is_primary_contact")
    private Boolean isPrimaryContact = false;

    @Column(name = "is_emergency_contact")
    private Boolean isEmergencyContact = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    enum GuardianRelationship { UNCLE, AUNT, GRANDPARENT, SIBLING, OTHER }
}
