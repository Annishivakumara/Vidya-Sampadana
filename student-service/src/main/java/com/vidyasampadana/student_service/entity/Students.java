// Student Entity - Main Aggregate Root with Injected Relationships
package com.vidyasampadana.student_service.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Table(name = "students")
@AllArgsConstructor
@NoArgsConstructor
public class Students {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", length = 36, nullable = false, unique = true)
    private String studentId;

    // Injected One-to-One Relationships
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "studentContId")
    private StudentContactInfo contactInfo;



    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "student_academic_id")
    private StudentAcademicProfile academicProfile;


    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "student_parent_id")
    private StudentParentInfo studentParentInfo;


    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "student_add_id")
    private StudentAddressInfo studentAddressInfo;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "student_exam_id")
    private  StudentExamScores studentExamScores;



}