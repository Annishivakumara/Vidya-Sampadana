package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class StudentGuardianInfo {

<<<<<<< HEAD
    @Column(name = "guardian_name", length = 255, nullable = false)
=======
    @Column(name = "guardian_name", length = 255)
>>>>>>> sub_me/main
    private String name;

    @Column(name = "guardian_phone", length = 20)
    private String phone;

    @Column(name = "guardian_email", length = 255)
    private String email;

    @Enumerated(EnumType.STRING)
<<<<<<< HEAD
    @Column(name = "guardian_relationship", length = 30, nullable = false)
=======
    @Column(name = "guardian_relationship", length = 30)
>>>>>>> sub_me/main
    private GuardianRelationship relationship;

    @Column(name = "guardian_occupation", length = 100)
    private String occupation;

    @Column(name = "guardian_company", length = 255)
    private String company;

    @Column(name = "guardian_age")
    private Integer age;

<<<<<<< HEAD
    @Column(name = "G_is_primary_contact", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isPrimaryContact;

    @Column(name = "G_is_emergency_contact", columnDefinition = "BOOLEAN DEFAULT FALSE")
=======

    @Column(name = "guardian_is_primary_contact", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isPrimaryContact;

    @Column(name = "guardian_is_emergency_contact", columnDefinition = "BOOLEAN DEFAULT FALSE")
>>>>>>> sub_me/main
    private Boolean isEmergencyContact;
}