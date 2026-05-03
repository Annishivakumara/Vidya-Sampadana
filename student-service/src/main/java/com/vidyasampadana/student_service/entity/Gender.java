package com.vidyasampadana.student_service.entity;

<<<<<<< HEAD
import lombok.Getter;

=======
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

import static javax.management.Query.value;

>>>>>>> sub_me/main
@Getter
public enum Gender {
    MALE("Male"),
    FEMALE("Female"),
    TRANSGENDER("Transgender"),
    NON_BINARY("Non-Binary"),
    PREFER_NOT_TO_SAY("Prefer not to say");

    private final String displayName;

    Gender(String displayName) {
        this.displayName = displayName;
    }
<<<<<<< HEAD
=======
    @JsonCreator
    public static Gender from(String value) {
        if(value==null || value.isBlank()){
            try {
                throw new IllegalAccessException("Gender value must not be null or blank");
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }
        String normaolizedString=value.trim().toUpperCase().replace('-', '_');
        for (Gender gen:values()){
            if(gen.name().equals(normaolizedString)){
                return gen;
            }
        }
        for(Gender gen:values()) {
            if (gen.displayName.equalsIgnoreCase(value.trim())) {
                return gen;
            }
        }
            throw new IllegalArgumentException(
                    "Invalid gender value: '" + value + "'. Accepted values: MALE, FEMALE, TRANSGENDER, NON_BINARY, PREFER_NOT_TO_SAY"
            );

    }
>>>>>>> sub_me/main
}
