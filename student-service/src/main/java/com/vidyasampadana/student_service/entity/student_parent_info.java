package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "student_parent_info")
@NoArgsConstructor
@AllArgsConstructor

public class student_parent_info {

        @Id
        @Column(name = "id", length = 36)
        private String student_parent_id;

        @Embedded
        @OneToMany(mappedBy = "parentInfo", cascade = CascadeType.ALL)
        private student_father_info studentFatherInfo;

        @Embedded
        @OneToMany(mappedBy = "parentInfo", cascade = CascadeType.ALL)
        private student_mother_info studentMotherInfo;

        @Embedded
        @OneToMany(mappedBy = "parentInfo", cascade = CascadeType.ALL)
        private student_guardian_info studentGuardianInfo;

        @Column(name = "created_at")
        private LocalDateTime createdAt;

        @Column(name = "updated_at")
        private LocalDateTime updatedAt;
    }