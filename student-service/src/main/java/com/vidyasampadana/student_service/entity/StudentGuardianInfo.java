package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class StudentGuardianInfo {


    @Column(name = "guardianName", length = 255, nullable = false)
    private String name;

    @Column(name = "guardianPhone", length = 20)
    private String phone;

    @Column(name = "guardianEmail", length = 255)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "guardianRelationship", nullable = false)
    private GuardianRelationship relationship;

    @Column(name = "guardianOccupation", length = 100)
    private String occupation;

    @Column(name = "guardianCompany", length = 255)
    private String company;

    @Column(name = "guardianAge")
    private Integer age;

    @Column(name = "G_is_primary_contact")
    private Boolean isPrimaryContact = false;

    @Column(name = "G_is_emergency_contact")
    private Boolean isEmergencyContact = false;


    public enum GuardianRelationship { UNCLE, AUNT, GRANDPARENT, SIBLING, OTHER }
}
