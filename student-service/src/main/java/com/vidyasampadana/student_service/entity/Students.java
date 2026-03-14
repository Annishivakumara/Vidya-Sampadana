// Student Entity - Main Aggregate Root with Injected Relationships
package com.vidyasampadana.student_service.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;


@Data
@Entity
@Table(name = "students")
@AllArgsConstructor
@NoArgsConstructor
public class Students {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // Database primary key

    @Column(name = "student_id", length = 36, nullable = false, unique = true)
    private String studentId;  // Business identifier (UUID or roll number)

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "student_cont_id", referencedColumnName = "student_cont_id")
    private StudentContactInfo contactInfo;


    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name ="academic_id", referencedColumnName="academic_id")
    private StudentAcademicProfile academicProfile;


    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id" ,referencedColumnName = "parent_id")
    private StudentParentInfo studentParentInfo;


    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "address_id")
    private StudentAddressInfo studentAddressInfo;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "exam_id", referencedColumnName = "exam_id")
    private  StudentExamScores studentExamScores;

}