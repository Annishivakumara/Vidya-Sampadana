package com.vidyasampadana.student_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_parent_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentParentInfo {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "parent_id") // <-- match DB column
        private Long parentId;

        @Embedded
        private StudentFatherInfo fatherInfo;

        @Embedded
        private StudentMotherInfo motherInfo;

        @Embedded
        private StudentGuardianInfo guardianInfo;
}
