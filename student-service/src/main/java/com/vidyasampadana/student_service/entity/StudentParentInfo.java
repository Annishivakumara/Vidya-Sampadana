package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_parent_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class StudentParentInfo {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "parent_id") // <-- match DB column
        @EqualsAndHashCode.Include
        private Long parentId;

        @Embedded
        private StudentFatherInfo fatherInfo;

        @Embedded
        private StudentMotherInfo motherInfo;

        @Embedded
        private StudentGuardianInfo guardianInfo;
}
