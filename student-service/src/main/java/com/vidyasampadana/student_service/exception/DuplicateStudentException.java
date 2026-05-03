package com.vidyasampadana.student_service.exception;

import org.springframework.web.bind.annotation.RestControllerAdvice;


public class DuplicateStudentException extends RuntimeException {
    public DuplicateStudentException(String message) {
        super(message);
    }
}
