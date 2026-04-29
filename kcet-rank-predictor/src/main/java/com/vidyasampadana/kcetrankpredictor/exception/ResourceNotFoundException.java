package com.vidyasampadana.kcetrankpredictor.exception;

// Resource not found
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

