package com.vidyasampadana.user_service.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

// Student.java
@Entity
@DiscriminatorValue("STUDENT")
@Data
@EqualsAndHashCode(callSuper = true)
public class Student extends User {
    private String institutionName;
}
