package com.vidyasampadana.student_service.entity;


import lombok.Getter;

@Getter
public enum GuardianRelationship {

    UNCLE("Uncle", "Father's or Mother's Brother"),
    AUNT("Aunt", "Father's or Mother's Sister"),
    GRANDPARENT("Grandparent", "Father's or Mother's Parent"),
    SIBLING("Sibling", "Brother or Sister"),
    OTHER("Other", "Any other relationship");

    private final String displayName;
    private final String description;

    GuardianRelationship(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }
}
