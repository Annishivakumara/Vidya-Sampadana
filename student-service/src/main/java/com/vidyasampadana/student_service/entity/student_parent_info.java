package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "student_parent_info")
@NoArgsConstructor
@AllArgsConstructor
public class student_parent_info {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parents_id;

    private student_father_info studentFatherInfo;

}
