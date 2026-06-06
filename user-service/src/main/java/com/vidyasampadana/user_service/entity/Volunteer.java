package com.vidyasampadana.user_service.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

// Volunteer.java
@Entity
@DiscriminatorValue("VOLUNTEER")
@Data
@EqualsAndHashCode(callSuper = true)
public class Volunteer extends User {
    private String expertise;
}
