package com.vidyasampadana.student_service.entity;

import lombok.Getter;

@Getter
public enum BloodGroup {

    A_POSITIVE("A+"),
    A_NEGATIVE("A-"),
    B_POSITIVE("B+"),
    B_NEGATIVE("B-"),
    O_POSITIVE("O+"),
    O_NEGATIVE("O-"),
    AB_POSITIVE("AB+"),
    AB_NEGATIVE("AB-");

    private final String label;

    BloodGroup(String label) {
        this.label = label;
    }
}
